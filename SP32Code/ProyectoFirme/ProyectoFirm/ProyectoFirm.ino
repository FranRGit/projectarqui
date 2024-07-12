#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "Emergencia";
const char* password = "hola12345";
const int buzzerPin = 16;
AsyncWebServer server(80);


//---------------[DISPLAY]---------------------------
// Definición de pines para los segmentos del display
const int a = 17;
const int b = 26;
const int c = 27;
const int d = 18;
const int e = 19;
const int f = 33;
const int g = 32;

// Tabla de segmentos para los dígitos del 0 al 9
const char tabla[11][8] = {
    {'1', '1', '1', '1', '1', '1', '0'},  // 0
    {'0', '1', '1', '0', '0', '0', '0'},  // 1
    {'1', '1', '0', '1', '1', '0', '1'},  // 2
    {'1', '1', '1', '1', '0', '0', '1'},  // 3
    {'0', '1', '1', '0', '0', '1', '1'},  // 4
    {'1', '0', '1', '1', '0', '1', '1'},  // 5
    {'1', '0', '1', '1', '1', '1', '1'},  // 6
    {'1', '1', '1', '0', '0', '0', '0'},  // 7
    {'1', '1', '1', '1', '1', '1', '1'},  // 8
    {'1', '1', '1', '1', '0', '1', '1'},  // 9

};


void setup() {

  Serial.begin(115200);

  //Pin Buzzer
  pinMode(buzzerPin,OUTPUT);

  //Pines Display
  pinMode(a, OUTPUT);
  pinMode(b, OUTPUT);
  pinMode(c, OUTPUT);
  pinMode(d, OUTPUT);
  pinMode(e, OUTPUT);
  pinMode(f, OUTPUT);
  pinMode(g, OUTPUT);

  //-----------[WIFI]------------------
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  
  Serial.println("Conectado a WiFi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
  
  //-----------[SERVIDOR]--------------------
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "¡Hola desde ESP32!");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.on("/registroExitoso", HTTP_GET, [](AsyncWebServerRequest *request){
    encenderBuzzer();

    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "distanciaStr");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    request->send(response);
  });

  server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest *request){
    double distancia = calculardistancia();
    Serial.print(distancia);
    String distanciaStr = String(distancia);
    
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", distanciaStr);
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    request->send(response);
  });

    server.on("/numeroTurnos", HTTP_GET, [](AsyncWebServerRequest *request){
    if (request->hasParam("numero")) {
      String numero = request->getParam("numero")->value();
      int numeroEntero = numero.toInt();  
      
      numeroTurnos(numeroEntero);
    }
    
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "Turnos actualizados");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    request->send(response);
  });

  server.begin();
}


//-----------------[BUZZER]-------------------- 
void encenderBuzzer(){
  digitalWrite(buzzerPin,HIGH);
  delay(1000);
  digitalWrite(buzzerPin,LOW);
  delay(1000);
}

//--------------[DISPLAY]-----------------
void numeroTurnos(int n){
    digitalWrite(a, tabla[n][0] == '1' ? HIGH : LOW);
    digitalWrite(b, tabla[n][1] == '1' ? HIGH : LOW);
    digitalWrite(c, tabla[n][2] == '1' ? HIGH : LOW);
    digitalWrite(d, tabla[n][3] == '1' ? HIGH : LOW);
    digitalWrite(e, tabla[n][4] == '1' ? HIGH : LOW);
    digitalWrite(f, tabla[n][5] == '1' ? HIGH : LOW);
    digitalWrite(g, tabla[n][6] == '1' ? HIGH : LOW);
}

//------------------SENSOR ULTRASONICO----------------------
long readUltrasonicDistance(int triggerPin, int echoPin){
  //Iniciamos el pin del emisor de reuido en salida
  pinMode(triggerPin, OUTPUT);
  //Apagamos el emisor de sonido
  digitalWrite(triggerPin, LOW);
  //Retrasamos la emision de sonido por 2 milesismas de segundo
  delayMicroseconds(2);
  // Comenzamos a emitir sonido
  digitalWrite(triggerPin, HIGH);
  //Retrasamos la emision de sonido por 2 milesismas de segundo
  delayMicroseconds(10);
  //Apagamos el emisor de sonido
  digitalWrite(triggerPin, LOW);
  //Comenzamos a escuchar el sonido
  pinMode(echoPin, INPUT);
  // Calculamos el tiempo que tardo en regresar el sonido
  return pulseIn(echoPin, HIGH);
}

double calculardistancia(){
  double distancia = 26-0.01723 * readUltrasonicDistance(23, 22);
  return distancia;
}

void loop(){

}
