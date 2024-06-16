#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define LDR_PIN A0

const char* ssid = "Jefferson";
const char* password = "vargas1974";
const char* userId = "clxcf4gge0000596sksa3fm8e";
const char* sensorId = "1";


WiFiClientSecure client;
DHT dht(DHTPIN, DHTTYPE);

unsigned long previousPostMillis = 0;
unsigned long previousGetMillis = 0;
const long postInterval = 5000;  // Intervalo de 5 segundos (5000 ms)
const long getInterval = 1800000; // Intervalo de 10 minutos (1800000 ms)

void setup() {

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  dht.begin();

  Serial.print("Conectando-se a ");
  Serial.print(ssid); Serial.println(" ...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado.");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());

  client.setInsecure();

  if (checkServerStatus()) {
    sendSensorData();
  } else {
    Serial.println("Erro: Não foi possível verificar o status do servidor.");
  }
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);

  unsigned long currentPostMillis = millis();
  unsigned long currentGetMillis = millis();

  if (currentPostMillis - previousPostMillis >= postInterval) {
    previousPostMillis = currentPostMillis;

    if (WiFi.status() == WL_CONNECTED) {
      sendSensorData();
    } else {
      Serial.println("Erro: WiFi desconectado.");
    }
  }

  if (currentGetMillis - previousGetMillis >= getInterval) {
    previousGetMillis = currentGetMillis;

    if (WiFi.status() == WL_CONNECTED) {
      checkServerStatus();
    } else {
      Serial.println("Erro: WiFi desconectado.");
    }
  }

}

bool checkServerStatus() {
  HTTPClient http;
  const int maxRedirects = 5;
  int redirectCount = 0;
  String url = "https://rucumate-api.vercel.app/";

  while (redirectCount < maxRedirects) {
    http.begin(client, url);
    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Resposta do Servidor:");
      Serial.println(payload);

      if (payload.indexOf("{\"message\":\"Server is running\"}") >= 0) {
        Serial.println("Servidor está em execução.");
        http.end();
        return true;
      } else {
        Serial.println("Resposta inesperada do servidor.");
        break;
      }
    } else if (httpCode == HTTP_CODE_MOVED_PERMANENTLY || httpCode == HTTP_CODE_FOUND || httpCode == HTTP_CODE_SEE_OTHER || httpCode == HTTP_CODE_TEMPORARY_REDIRECT || httpCode == 308) {
      String newLocation = http.header("Location");
      if (newLocation.length() == 0) {
        Serial.println("Redirecionamento sem cabeçalho 'Location'.");
        break;
      } else {
        Serial.println("Redirecionando para: " + newLocation);
        url = newLocation;
        redirectCount++;
      }
    } else {
      Serial.println("Erro ao fazer a requisição GET: " + String(httpCode));
      break;
    }
    http.end();
  }

  return false;
}

void sendSensorData() {
  // Leitura dos sensores
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int lpure = analogRead(LDR_PIN);
  int l = map(lpure, 0, 1023, 0, 100);

  // Verifica se as leituras falharam e tenta novamente
  if (isnan(h) || isnan(t)) {
    Serial.println("Falha ao ler do DHT11");
    return;
  }

  HTTPClient http;
  http.begin(client, "https://rucumate-api.vercel.app/esp/data");
  http.addHeader("Content-Type", "application/json");

  String jsonData = "{\"sensorId\":" + String(sensorId) + ",\"temperature\":" + String(t) + ",\"humidity\":" + String(h) + ",\"luminosity\":" + String(l) + ",\"userId\":\"" + userId + "\"}";
  
  int httpCode = http.POST(jsonData);

  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println("Resposta do Servidor:");
    Serial.println(payload);
  } else {
    Serial.println("Erro ao fazer a requisição POST.");
  }

  http.end();
}
