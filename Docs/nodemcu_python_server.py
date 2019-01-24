from flask import Flask, request, abort, jsonify
import rethinkdb as r
import urllib
import _thread

dbHost='192.168.43.194' # localhost

class ControlManager:
    def __init__(self):
        self.controllers = {}

    def wait_for_internet_connection(self):
        while True:
            try:
                response = urllib.request.urlopen('http://localhost:9000',timeout=1)
                return
            except:
                pass

    def initialize(self):
        self.conn = r.connect(host=dbHost, port=28015, db='udupi_home').repl()

    def subscribe(self, name, ip):
        newConn = r.connect(host=dbHost, port=28015, db='udupi_home').repl()
        cursor = r.table('devices').filter({'controller': name}).run(newConn)
        devices = list(cursor)
        cursor.close()
        if len(devices) > 0:
            if not name in self.controllers:
                self.controllerStartUp(name=name, ip=ip, devices=devices)
                _thread.start_new_thread( self.exeChanges, (name, newConn, ip, ) )
            else:
                self.controllerStartUp(name=name, ip=ip, devices=devices)

    def controllerStartUp(self, name, ip, devices):
        self.controllers[name] = ip 
        for document in devices:
            if document['isSpeedControlled']:
                speed = document['speed'] if document['isOn'] else "000"
                self.getUrl("http://"+ip+"/serial?params="+document['pinNo']+speed)
                print("docs", document)
            else:
                self.getUrl("http://"+ip+"/mode/"+document['pinNo']+"/o")
                self.getUrl("http://"+ip+"/digital/"+document['pinNo']+"/"+ ("1" if document['isOn'] else "0"))
                print("docs", document)

    def exeChanges(self, name, newConn, ip):
        print(" async start !!!")
        feed = r.table('devices').filter({'controller': name}).changes().run(newConn)
        for change in feed:
            document = change["new_val"]
            if document['isSpeedControlled']:
                speed = document['speed'] if document['isOn'] else "000"
                self.getUrl("http://"+ip+"/serial?params="+document['pinNo']+speed)
            else:
                self.getUrl("http://"+ip+"/digital/"+document['pinNo']+"/"+ ("1" if document['isOn'] else "0"))
            print(change)
        print(" async over !!!")

    def switching(self, pin):
        cursor = r.table('devices').filter({'switchPin': pin}).run(self.conn)
        devices = list(cursor)
        for document in devices:
            print(document)
            print(document['isOn'])
            print(type(document['isOn']))
            state = not document['isOn']
            r.table('devices').filter({'switchPin': pin}).update({'isOn': state}).run(self.conn)

    def dimming(self, pin, speed):
        r.table('devices').filter({'switchPin': pin}).update({'speed': speed}).run(self.conn)

    def getUrl(self, url):
        try:
            response = urllib.request.urlopen(url,timeout=1)
            return response
        except:
            return "error"


app = Flask(__name__)

controlManager = ControlManager()

@app.route('/')
def hello_world():
   return 'Hello World'

@app.route('/api/v1/subscribe', methods=['POST'])
def subscribe():
    if not request.json or not 'ip' in request.json or not 'name' in request.json:
        abort(400)
    controlManager.subscribe(name=request.json['name'], ip=request.json['ip'])
    response={'message': "success",
               'status': 1}
    return jsonify(response), 200

@app.route('/api/v1/switching', methods=['POST'])
def switching():
    if not request.json or not 'pin' in request.json:
        abort(400)
    controlManager.switching(pin=request.json['pin'])
    response={'message': "success",
               'status': 1}
    return jsonify(response), 200

@app.route('/api/v1/dimming', methods=['POST'])
def dimming():
    if not request.json or not 'pin' in request.json or not 'speed' in request.json:
        abort(400)
    controlManager.dimming(pin=request.json['pin'], speed=request.json['speed'])
    response={'message': "success",
               'status': 1}
    return jsonify(response), 200


if __name__ == '__main__':
    controlManager.wait_for_internet_connection()
    controlManager.initialize()
    app.run(host= '0.0.0.0') # host= '0.0.0.0' to access from all over the network

