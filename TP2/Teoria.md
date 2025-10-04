## 1. Ciclo Rojo → Verde → Refactor

El ciclo *Rojo → Verde → Refactor* pertenece a la metodología *TDD (Test-Driven Development)*.

- *Rojo:* se escribe un test que falla porque la funcionalidad aún no existe.
- *Verde:* se implementa el código mínimo necesario para que el test pase.
- *Refactor:* se mejora el código sin romper los tests.  
  El tamaño de los pasos debe ser *pequeño* para mantener foco, detectar errores rápidamente y facilitar la depuración.

---

## 2. Tests unitarios, de integración y E2E en APIs

- *Unitarios:* prueban funciones o módulos individuales sin dependencias externas.
- *Integración:* verifican la interacción entre varios módulos (por ejemplo, controladores y base de datos).
- *E2E (End-to-End):* simulan el flujo completo del usuario sobre la API (peticiones reales HTTP).  
  Cada tipo de test cubre un nivel distinto de confianza en el sistema.

---

## 3. Dobles de prueba: mock, stub y spy

Un *doble de prueba* reemplaza componentes reales para aislar el comportamiento en tests.

- *Stub:* devuelve respuestas predefinidas (simula datos o errores).
- *Mock:* verifica que ciertas llamadas o argumentos se realicen.
- *Spy:* registra llamadas reales sin modificar el comportamiento.  
  Usar stubs para evitar dependencias externas, mocks para probar interacciones y spies para auditar efectos.

---

## 4. Separar app de server

Separar app del server permite testear la aplicación sin levantar un puerto real.  
makeApp() crea la app Express, y el server solo la ejecuta.

import express from "express";
import ordersRouter from "./routes/orders.route";

export function makeApp() {
  const app = express();
  app.use(express.json());
  app.use(ordersRouter);
  return app;
}


import { makeApp } from "./app";
const app = makeApp();
app.listen(3000, () => {
    console.log("on port 3000");
})



## 5. Zod: diferencia entre parse y safeParse

- **parse()** lanza una excepción si la validación falla.
- **safeParse()** devuelve { success, data/error } sin lanzar error.  
  En una ruta Express, se usa safeParse() al validar req.body para manejar errores y responder con 400, mientras parse() puede usarse internamente donde los datos ya son confiables.

---

## 6. Reglas de dominio con tests unitarios

Ejemplos:

1. *Regla de descuentos:* un cliente VIP obtiene 10% de descuento solo si su gasto anual > $100.000.
2. *Regla de cupos:* no permitir más inscripciones que la capacidad del curso.  
   Estas pruebas validan la lógica del negocio, no simples validaciones de entrada.

---

## 7. Malos olores en suites de tests

1. *Nombres genéricos:* test1() o shouldWork() no indican propósito.
2. *Duplicación de setup:* repetición de código para crear datos o instancias.
3. *Asserts débiles o mocks frágiles:* pruebas pasan aunque el comportamiento real esté roto o dependan de implementaciones internas.

---

## 8. Criterios de aceptación ↔ tests

| Criterio de aceptación                                                          | Test asociado                                           |
| ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Dado un usuario válido, cuando inicia sesión, entonces recibe un token JWT.     | POST /login devuelve 200 y contiene token.        |
| Dado un producto sin stock, cuando se intenta comprar, entonces devuelve error. | POST /comprar devuelve 400 y mensaje "Sin stock". |

---

## 9. Por qué no perseguir 100% de cobertura

Buscar 100% de cobertura puede generar *tests inútiles o frágiles*, donde se testea código trivial solo por cumplir la métrica. No garantiza calidad ni detección de bugs reales. Además, mantener esa cobertura puede ralentizar el desarrollo y desincentivar refactorizaciones.

---

## 10. Helper/Builder para tests

Un *helper* o *builder* genera objetos o estados preconfigurados para simplificar tests.  
Ejemplo:

// userBuilder.ts
export interface User {
  name: string;
  age: number;
  email: string;
}

export function userBuilder(overrides: Partial<User> = {}): User {
  return {
    name: "Usuario Test",
    age: 25,
    email: "test@example.com",
    ...overrides, // permite personalizar campos según el test
  };
}
// user.test.ts
import { userBuilder } from "./userBuilder";

test("debe crear un usuario mayor de edad", () => {
  const user = userBuilder({ age: 18 });
  expect(user.age).toBeGreaterThanOrEqual(18);
});

test("permite sobreescribir campos opcionales", () => {
  const user = userBuilder({ email: "nuevo@mail.com" });
  expect(user.email).toBe("nuevo@mail.com");
});
