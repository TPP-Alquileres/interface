# Casos de uso


## PROPIETARIO
### Crear Contrato -> DONE
- Como propietario, creo un contrato, se almacena en la base de datos y se disponibiliza un link para que el inquilino pueda firmar -> DONE

### Ejecutar Reclamo -> TODO
- Como propietario, inicio el reclamo de un contrato para que los ADMINISTRADORES puedan ejecutar decidir en qué estado dejar el contrato y queda el contrato en estado IN-REVIEW.

## INQUILINO
### Firmar contrato -> 
- Como inquilino, abro un link que me pasa el propietario, y decido si firmarlo, si lo firmo, entonces se crea el contrato en la blockchain y se cambia el estado del contrato a ACTIVE.

## INVERSOR
##

## Admins
- Cuando hay un reclamo (CONTRATOS EN ESTADO IN_REVIEW) pueden pasarlos a EXCECUTED, que ejecuta la transferencia del POOL al PROPIETARIO. 