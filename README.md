# Redes 1 : Proyecto 2
|Grupo 2| Carnet | Nombre |
| --- | --- | --- |
| Coordinador | 201602813 | Luis Enrique Rivera Najera |
| Compañero 2 | 201602880 | Bryan Alexander Portillo Alvarado  |
| Compañero 3 | 201709073 | Walter Alexander Guerra Duque |
| Compañero 4 | 201403793 | Kevin Nicolas Garcia Martinez |

# Manual Tecnico 

## Comandos

- **_config t_** : este comando permite acceder al modo configuración global desde el modo privilegiado.
- **_switchport mode trunk_** : este comando pone la interfaz en modo de enlace troncal permanente y negocia para convertir el enlace vecino en un enlace troncal.
- **_switchport trunk allowed vlan_** : este comando se usa para especificar la lista de VLAN que están permitidas en un puerto troncal.
- **_int f#/#_** : este comando permite seleccionar algun puerto de un switch para aplicarle alguna configuración.
- **_ip address ip mascara_** : este  comando permite definir la dirección IP y la máscara de subred que desea asignar a la interfaz.
- **_ip route ip-red mascara-subred interfaz-salida_** : este comando permite definir las rutas estáticas, interfaz-salida significa que sirve para reenviar paquetes a la red de destino.
- **_glbp_** : es una solución propia de Cisco que permite la selección automática y la utilización simultánea de varias puertas de enlace disponibles, además de la conmutación por falla automática entre esas puertas de enlace. 

## TABLA DEL RESULTADO DEL SUBNETTING
|Sub_Red|No de Host|IP de Red|Máscara|Primer Host|Ultimo Host|Broadcast|
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 2 | 3 | 4 | 5 | 6 | 7 |

## Topologías 

### Topologia 1

**---------------------------------------------- Configuración R1 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.3.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.3.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.3.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.3.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.3.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.3.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.3.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.3.0.9 255.255.255.252
no shutdown
end
```

#### Ruteo
**---------------------------------------------- Configuración R1 ----------------------------------------------**

```sh
conf t
ip route 192.168.34.0 255.255.255.0 10.3.0.2
ip route 10.3.0.16 255.255.255.252 10.3.0.10
ip route 192.168.35.0 255.255.255.0 10.3.0.10
end 
```

**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
ip route 192.168.34.0 255.255.255.0 10.3.0.2
ip route 10.3.0.16 255.255.255.252 10.3.0.10
ip route 192.168.35.0 255.255.255.0 10.3.0.10
end 
```
**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
ip route 192.168.34.0 255.255.255.0 10.3.0.2
ip route 10.3.0.16 255.255.255.252 10.3.0.10
ip route 192.168.35.0 255.255.255.0 10.3.0.10
end 
```

**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
ip route 192.168.34.0 255.255.255.0 10.3.0.2
ip route 10.3.0.16 255.255.255.252 10.3.0.10
ip route 192.168.35.0 255.255.255.0 10.3.0.10
end 
```
#### Balanceador de Carga
**---------------------------------------------- Configuración R1 ----------------------------------------------**

```sh
conf t
int f0/0
glbp 1 ip 10.3.0.10
glbp 1 preempt
glbp 1 priority 150
glbp 1 load-balancing round-robin
end
```
**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
int f0/0
standby 1 ip 10.3.0.9
standby 1 priority 150
standby 1 preempt
end
```

**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
int f0/0
glbp 1 ip 10.3.0.14
glbp 1 load-balancing round-robin
end
```

**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
int f0/0
standby 1 ip 10.3.0.13
end
```

#### Configuracion de nubes 

**Cloud1**

**Cloud2**

**Cloud3**




### Topologia 2

#### Configuracion de Switch 
**---------------------------------------------- Configuración ESW1 ----------------------------------------------**

```sh
conf t
vlan 10 
name RHUMANOS
vlan 20
name CONTABILIDAD
vlan 30
name VENTAS
vlan 40 
name INFORMATICA
exit
```
```sh
int f1/0
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
```

```sh
int f1/1
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
```
```sh
int f1/2
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit
exit
write
```
#### Configuracion de Routers
**---------------------------------------------- Configuración R1 ----------------------------------------------**

```sh
conf t
int f0/0.10
encapsulation dot1Q 10
ip address 192.168.34.62 255.255.255.192
no shutdown
exit
int f0/0.20
encapsulation dot1Q 20
ip address 192.168.34.126 255.255.255.192
no shutdown
exit
int f0/0.30
encapsulation dot1Q 30
ip address 192.168.34.190 255.255.255.192
no shutdown
exit
int f0/0.40
encapsulation dot1Q 40
ip address 192.168.34.254 255.255.255.192
no shutdown
exit
int f1/0
ip address 10.3.0.2 255.255.255.252
no shutdown
exit
int f2/0
ip address 10.3.0.6 255.255.255.252
no shutdown
end
```
```sh
conf t
interface fastEthernet 0/0 
no shutdown
exit
```

#### Ruteo
```sh
conf t
ip route 10.3.0.8 255.255.255.252 10.3.0.1
ip route 10.3.0.12 255.255.255.252 10.3.0.5
ip route 10.3.0.16 255.255.255.252 10.3.0.1
ip route 10.3.0.20 255.255.255.252 10.3.0.5
ip route 192.168.35.0 255.255.255.0 10.3.0.1
ip route 192.168.35.0 255.255.255.0 10.3.0.5
end
```
#### Configuracion VPCS
**---------------------------------------------- Configuración Ventas ----------------------------------------------**

```sh
ip
```

**---------------------------------------------- Configuración Contabilidad ----------------------------------------------**

```sh
ip
```

**---------------------------------------------- Configuración Informatica ----------------------------------------------**

```sh
ip
```

**---------------------------------------------- Configuración RRHH ----------------------------------------------**

```sh
ip
```

#### Configuracion de nubes 

**Cloud1**

**Cloud2**

### Topologia 3

#### Configuracion de Switch
**---------------------------------------------- Configuración ESW1 ----------------------------------------------**
```sh
conf t
vlan 10 
name RHUMANOS
vlan 20
name CONTABILIDAD
vlan 30
name VENTAS
vlan 40 
name INFORMATICA
exit
```
```sh
int f1/0
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
```
```sh
int f1/1
switchport mode access
switchport access vlan 30
```
```sh
int f1/2
switchport mode access
switchport access vlan 20
```
```sh
int f1/3
switchport mode access
switchport access vlan 10
```
```sh
int f1/4
switchport mode access
switchport access vlan 40
exit
exit
write
```

#### Configuracion de Routers
**---------------------------------------------- Configuración R1 ----------------------------------------------**
```sh
conf t
int f0/0.10
encapsulation dot1Q 10
ip address 192.168.35.62 255.255.255.192
no shutdown
exit
```
```sh
int f0/0.20
encapsulation dot1Q 20
ip address 192.168.35.126 255.255.255.192
no shutdown
exit
```
```sh
int f0/0.30
encapsulation dot1Q 30
ip address 192.168.35.190 255.255.255.192
no shutdown
exit
```
```sh
int f0/0.40
encapsulation dot1Q 40
ip address 192.168.35.254 255.255.255.192
no shutdown
exit
```
```sh
int f1/0
ip address 10.3.0.18 255.255.255.252
no shutdown
exit
```
```sh
int f2/0
ip address 10.3.0.22 255.255.255.252
no shutdown
end
```
#### Ruteo
```sh
conf t
ip route 10.3.0.8 255.255.255.252 10.3.0.17
ip route 10.3.0.12 255.255.255.252 10.3.0.21
ip route 10.3.0.0 255.255.255.252 10.3.0.17
ip route 10.3.0.4 255.255.255.252 10.3.0.21
ip route 192.168.34.0 255.255.255.0 10.3.0.17
ip route 192.168.34.0 255.255.255.0 10.3.0.21
end
```
#### Configuracion VPCS
**---------------------------------------------- Configuración Contabilidad1 ----------------------------------------------**
```sh
ip
```

**---------------------------------------------- Configuración Informatica1 ----------------------------------------------**
```sh
ip
```

**---------------------------------------------- Configuración Ventas1 ----------------------------------------------**
```sh
ip
```

**---------------------------------------------- Configuración RRHH1 ----------------------------------------------**
```sh
ip
```





