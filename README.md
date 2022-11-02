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
### Topologia 2
|Sub_Red|No de Host|IP de Red|Máscara|Primer Host|Ultimo Host|Broadcast|
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 30 | 192.168.24.192 /27 | 255.255.255.224 | 192.168.24.193 | 192.168.24.222 | 192.168.24.223 |
| 2 | 14 | 192.168.24.224 /28 | 255.255.255.240 | 192.168.24.255 | 192.168.24.238 | 192.168.24.239 |
| 3 | 126 | 192.168.24.0 /25 | 255.255.255.128 | 192.168.24.1 | 192.168.24.126 | 192.168.24.127 |
| 4 | 62 | 192.168.24.128 /26 | 255.255.255.192 | 192.168.24.129 | 192.168.24.190 | 192.168.24.191 |
### Topologia 3
|Sub_Red|No de Host|IP de Red|Máscara|Primer Host|Ultimo Host|Broadcast|
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 30 | 192.168.25.192 /27 | 255.255.255.224 | 192.168.25.193 | 192.168.25.222 | 192.168.25.223 |
| 2 | 14 | 192.168.25.224 /28 | 255.255.255.240 | 192.168.25.255 | 192.168.25.238 | 192.168.25.239 |
| 3 | 126 | 192.168.25.0 /25 | 255.255.255.128 | 192.168.25.1 | 192.168.25.126 | 192.168.25.127 |
| 4 | 62 | 192.168.25.128 /26 | 255.255.255.192 | 192.168.25.129 | 192.168.25.190 | 192.168.25.191 |
### Subnetting Routers Topologias 1,2,3
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/subneting.png)

## Topologías 

### Topologia 1
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/t1_topo.jpg)

**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.2.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.2.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.2.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.2.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.2.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.2.0.9 255.255.255.252
no shutdown
end
```
**---------------------------------------------- Configuración R5 ----------------------------------------------**

```sh
conf t
int f1/0
ip address 10.2.0.1 255.255.255.252
no shutdown
exit
int f0/0
ip address 10.2.0.9 255.255.255.252
no shutdown
end
```

#### Ruteo
**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
ip route 192.168.24.0 255.255.255.0 10.2.0.21
ip route 192.168.25.0 255.255.255.0 10.2.0.10
ip route 10.2.0.28 255.255.255.248 10.2.0.10
end 
```

**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
ip route 192.168.24.0 255.255.255.0 10.2.0.17
ip route 192.168.25.0 255.255.255.0 10.2.0.2
ip route 10.2.0.24 255.255.255.252 10.2.0.2
end 
```
**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
ip route 192.168.24.0 255.255.255.0 10.2.0.1
ip route 192.168.25.0 255.255.255.0 10.2.0.26
ip route 10.2.0.16 255.255.255.252 10.2.0.1
end 
```

**---------------------------------------------- Configuración R5 ----------------------------------------------**

```sh
conf t
ip route 192.168.24.0 255.255.255.0 10.2.0.9
ip route 192.168.25.0 255.255.255.0 10.2.0.30
ip route 10.2.0.20 255.255.255.248 10.2.0.9
end 
```
#### Balanceador de Carga
**---------------------------------------------- Configuración R2 ----------------------------------------------**

```sh
conf t
int f0/1
glbp 1 ip 10.2.0.11
glbp 1 preempt
glbp 1 priority 150
glbp 1 timers 5 18
glbp 1 load-balancing round-robin
end
```
**---------------------------------------------- Configuración R3 ----------------------------------------------**

```sh
conf t
int f0/0
standby 1 ip 10.2.0.9
standby 1 priority 150
standby 1 preempt
end
```

**---------------------------------------------- Configuración R4 ----------------------------------------------**

```sh
conf t
int f0/1
glbp 1 ip 10.2.0.3
glbp 1 load-balancing round-robin
end
```

**---------------------------------------------- Configuración R5 ----------------------------------------------**

```sh
conf t
int f0/0
standby 1 ip 10.2.0.13
end
```

#### Configuracion de nubes 

**Cloud5**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/t1_%20cloud5.png)

**Cloud6**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/t1_%20cloud6.png)

**Cloud7**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/t1_%20cloud7.png)

**Cloud8**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/t1_%20cloud8.png)




### Topologia 2
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/topo2.jpg)
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
ip address 192.168.24.222 255.255.255.224
no shutdown
exit
int f0/0.20
encapsulation dot1Q 20
ip address 192.168.24.238 255.255.255.240  
no shutdown
exit
int f0/0.30
encapsulation dot1Q 30
ip address 192.168.24.126 255.255.255.128
no shutdown
exit
int f0/0.40
encapsulation dot1Q 40
ip address 192.168.24.190 255.255.255.192
no shutdown
exit
int f0/1
ip address 10.2.0.17 255.255.255.252
no shutdown
exit
int f1/0
ip address 10.2.0.21 255.255.255.252
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
ip route 192.168.25.0 255.255.255.0 10.2.0.18
ip route 10.2.0.0 255.255.255.248 10.2.0.18
ip route 10.2.0.24 255.255.255.252 10.2.0.18
ip route 192.168.25.0 255.255.255.0 10.2.0.22
ip route 10.2.0.8 255.255.255.248 10.2.0.22
ip route 10.2.0.28 255.255.255.252 10.2.0.22
end
```

#### Clientes-Ventas
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/cliente_ventas.jpg)

#### DNS - Ventas
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/dns_ventas.jpg)

#### Configuracion de nubes 

**Cloud3**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/Cloud3_TOPO2.jpg)
**Cloud4**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/cloud4_TOPO2.jpg)

### Topologia 3
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/T3.JPG)

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
ip address 192.168.25.222 255.255.255.224
no shutdown
exit
```
```sh
int f0/0.20
encapsulation dot1Q 20
ip address 192.168.25.238 255.255.255.240  
no shutdown
exit
```
```sh
int f0/0.30
encapsulation dot1Q 30
ip address 192.168.25.126 255.255.255.128
no shutdown
exit
```
```sh
int f0/0.40
encapsulation dot1Q 40
ip address 192.168.25.190 255.255.255.192
no shutdown
exit
```
```sh
int f0/1
ip address 10.2.0.26 255.255.255.252
no shutdown
exit
```
```sh
int f1/0
ip address 10.2.0.30 255.255.255.252
no shutdown
end
```
#### Ruteo
```sh
conf t
ip route 192.168.24.0 255.255.255.0 10.2.0.25
ip route 10.2.0.0 255.255.255.248 10.2.0.25
ip route 10.2.0.16 255.255.255.252 10.2.0.25
ip route 192.168.24.0 255.255.255.0 10.2.0.29
ip route 10.2.0.8 255.255.255.248 10.2.0.29
ip route 10.2.0.20 255.255.255.252 10.2.0.29
end
```

#### Configuracion de nubes 

**Cloud1**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/T3_C1.JPG)


**Cloud2**
![](https://github.com/LuisRivera2016/Proyecto2_Redes1/blob/Keviin/img/T3_C2.JPG)





