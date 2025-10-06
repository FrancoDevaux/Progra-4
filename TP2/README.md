# Que se utilizo
-En este proyecto se utilizo vitest
# Como correr coverage
```ruby
npm run coverage
```
## Guia de instalacion
-Clonar el repositorio
```ruby
Git clone https://github.com/FrancoDevaux/Progra-4/tree/main
```
-Instalar
```ruby
npm install
```
-Correr los test y el programa
```ruby
npm run start
```
```ruby
npm run test
```
## Historias de Usuario y Tests

### 1. Como cliente, quiero crear un pedido con toppings válidos para recibir mi pizza personalizada.
- **Test:** Debería crear un pedido con toppings válidos
- **Criterio de aceptación:** El pedido se crea correctamente si los toppings son válidos y el sistema responde con 201 y los datos del pedido.

---

### 2. Como cliente, no quiero poder crear un pedido si no selecciono ningún topping.
- **Test:** No se debe crear un pedido con toppings vacíos
- **Criterio de aceptación:** El sistema rechaza el pedido y responde con 422 si la lista de toppings está vacía.

---

### 3. Como cliente, no quiero poder crear un pedido con toppings que no están permitidos.
- **Test:** No se debe crear un pedido con toppings inválidos
- **Criterio de aceptación:** El sistema rechaza el pedido y responde con 422 si hay toppings no válidos.

---

### 4. Como cliente, no quiero poder crear un pedido con más de 5 toppings.
- **Test:** No se debe crear un pedido con más de 5 toppings
- **Criterio de aceptación:** El sistema rechaza el pedido y responde con 422 si hay más de 5 toppings.

---

### 5. Como cliente, quiero que el precio de mi pedido se calcule correctamente según los toppings seleccionados.
- **Test:** Debería calcular correctamente el precio con toppings
- **Criterio de aceptación:** El sistema responde con 201 y el precio calculado es correcto.

---

### 6. Como cliente, no quiero poder cancelar un pedido que ya fue entregado.
- **Test:** No se debe cancelar un pedido entregado
- **Criterio de aceptación:** El sistema responde con 409 si intento cancelar un pedido entregado.

---

### 7. Como cliente, quiero poder marcar mi pedido como entregado cuando lo reciba.
- **Test:** Debería marcar un pedido como entregado
- **Criterio de aceptación:** El sistema responde con 200 y el estado del pedido es "entregado".

---

### 8. Como cliente, no quiero poder marcar como entregado un pedido que fue cancelado.
- **Test:** No se debe marcar como entregado un pedido cancelado
- **Criterio de aceptación:** El sistema responde con 409 si intento marcar como entregado un pedido cancelado.

---

### 9. Como desarrollador, quiero que la lista de toppings válidos esté correctamente definida.
- **Test:** debería tener los toppings correctos
- **Criterio de aceptación:** El sistema tiene la lista de toppings válida y actualizada.
- --------------------------------------------
## Matriz de caso de uso
| ID   | Caso / Descripción                              | Precondición (estado/mocks)         | Input (query/body/params)                                      | Acción (HTTP)                  | Resultado esperado                                      | Test (archivo - nombre)                                 |
|------|-------------------------------------------------|-------------------------------------|----------------------------------------------------------------|-------------------------------|---------------------------------------------------------|---------------------------------------------------------|
| CA1  | Crear pedido con toppings válidos               |- | size: "M", toppings: ["cebolla", "tomate"], address            | POST /orders                  | 201 - body: { id, toppings: ["cebolla", "tomate"] }     | orders.test.ts - "Debería crear un pedido con toppings válidos"     
| CA2  | No crear pedido con toppings vacíos             | - | size: "M", toppings: [], address                               | POST /orders                  | 422                                                    | orders.test.ts - "No se debe crear un pedido con toppings vacíos"   
| CA3  | No crear pedido con toppings inválidos          | - | size: "M", toppings: ["pepperoni", "cebolla"], address         | POST /orders                  | 422                                                    | orders.test.ts - "No se debe crear un pedido con toppings inválidos"
| CA4  | No crear pedido con más de 5 toppings           |-| size: "M", toppings: [6 toppings], address                     | POST /orders                  | 422                                                    | orders.test.ts - "No se debe crear un pedido con más de 5 toppings"
| CA5  | Calcular precio con toppings                    | - | size: "M", toppings: ["4 quesos", "cebolla"], address          | POST /orders                  | 201 - body: { price: 20 }                              | orders.test.ts - "Debería calcular correctamente el precio con toppings"
| CA6  | No cancelar pedido entregado                    | Pedido entregado                    | id de pedido válido                                            | POST /orders/:id/cancel       | 409                                                    | orders.test.ts - "No se debe cancelar un pedido entregado"         
| CA7  | Marcar pedido como entregado                    | Pedido creado                       | id de pedido válido                                            | POST /orders/:id/entregado    | 200 - body: { status: "entregado" }                    | orders.test.ts - "Debería marcar un pedido como entregado"         
| CA8  | No marcar como entregado un pedido cancelado    | Pedido cancelado                    | id de pedido válido                                            | POST /orders/:id/entregado    | 409                                                    | orders.test.ts - "No se debe marcar como entregado un pedido cancelado"
| ER1  | Validar toppings correctos                      | —                                   | —                                                              | —                            | Valid_Toppings = ["cebolla", "4 quesos", "huevos", "tomate", "aceitunas"] | orders.test.ts - "debería tener los toppings correctos"

# Endpoints: 
- GET /order/:id  --> Devuleve las ordenes 
- GET /orders?status --> Obtener el estado de la orden
- POST /orders  --> Crear una orden
- POST /orders/:id/cancel --> Cancelar una orden
- POST /orders/:id/entregado --> Entregar la orden

## Ejemplo de curls

### ``POST /orders``

![Imagen de WhatsApp 2025-10-04 a las 16 51 31_09bb3e9b](https://github.com/user-attachments/assets/e0976ff2-5a02-4b45-955a-5f69294bddee)

------------------------------------

### ``GET /order/:id``
![Imagen de WhatsApp 2025-10-04 a las 16 52 32_b766e629](https://github.com/user-attachments/assets/ecb25ecf-3723-4f27-85a8-7bdbf8f58275)

--------------------

### ``GET /orders?status=pendiente``

![Imagen de WhatsApp 2025-10-04 a las 16 57 02_5186037c](https://github.com/user-attachments/assets/1f38af95-e447-417e-9ed7-ac48c1b49c81)

-------------------------------------

### ``POST /orders/:id/entregado``

![Imagen de WhatsApp 2025-10-04 a las 16 59 35_555c4130](https://github.com/user-attachments/assets/e1795306-44bb-41aa-b370-a41c67f43490)

- ``GET /orders?status=entregado`` o ``GET /order/:id``
  
  ![Imagen de WhatsApp 2025-10-04 a las 17 02 20_5c2f6bb4](https://github.com/user-attachments/assets/8f6f0ced-c9e0-48ce-983b-c461de2d9666)
  ![Imagen de WhatsApp 2025-10-04 a las 17 04 06_c16c5818](https://github.com/user-attachments/assets/6ceec3e1-9c2f-4d00-aa0b-178d4a1b9253)

------------------------------------

### ``POST /orders/:id/cancel``

![Imagen de WhatsApp 2025-10-04 a las 17 05 57_2905934d](https://github.com/user-attachments/assets/d5ad008d-a395-4f0f-91b3-7cb9396d0cb9)

  
