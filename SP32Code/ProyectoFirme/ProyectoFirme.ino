#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "MOVISTAR_FE80";
const char* password = "franciS#2067";
const int buzzerPin = 16;
AsyncWebServer server(80);


void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  
  Serial.println("Conectado a WiFi");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
  

  //Buzzer
  pinMode(buzzerPin,OUTPUT);

  // Rutas de ejemplo
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "¡Hola desde ESP32!");
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
  });

  server.on("/sensor", HTTP_GET, [](AsyncWebServerRequest *request){
    double distancia = calculardistancia();
    String distanciaStr = String(distancia);
    
    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", distanciaStr);
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    request->send(response);
  });

  server.on("/registroExitoso", HTTP_GET, [](AsyncWebServerRequest *request){
    encenderBuzzer();

    AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", "distanciaStr");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    request->send(response);
  });

  server.begin();
}

//BUZZER 
void encenderBuzzer(){
  digitalWrite(buzzerPin,HIGH);
  delay(1000);
  digitalWrite(buzzerPin,LOW);
  delay(1000);
}
//SENSOR ULTRASONICO
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
  double distancia = 0.01723 * readUltrasonicDistance(13, 12);
  return distancia;
}

void loop(){
}
