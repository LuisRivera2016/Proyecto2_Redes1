import React, { Component } from 'react';
import './pagina.css';
import Axios from "axios";

export default class Pagina extends Component {
    constructor(p) {
        super(p)
        this.inputChangedHandler1 = this.inputChangedHandler1.bind(this);
        this.inputChangedHandler2 = this.inputChangedHandler2.bind(this);
        this.inputChangedHandler3 = this.inputChangedHandler3.bind(this);
        this.insertar = this.insertar.bind(this);
        this.cargar = this.cargar.bind(this);
        
        this.headers = {
       'Content-Type': 'application/json'
    }
        this.state = {
            arreglo: [],
            arreglo2: [],
            producto: '',
            cantidad: 0,
            precio: 0.00
        }
    }

    componentDidMount() {
        this.cargar()
    }

    cargar = async e => {
       
        const res2 = await Axios({
            method:"post",
            url: "http://localhost:4000/obtener_todas"
          }) 

        this.setState({
            arreglo2: res2.data.resultado
        })

    }


    insertar = async e => {
        e.preventDefault();

        const pr = {
            precio: this.state.precio,
            cantidad: this.state.cantidad,
            producto: this.state.producto,
            
        }
        console.log(pr)
        const res = await Axios({
            method:"post",
            url: "http://localhost:4000/insertar",
            data: pr,
            headers : this.headers
          }) 


        const res2 = await Axios({
            method:"post",
            url: "http://localhost:4000/obtener_todas"
          }) 

        this.setState({
            arreglo2: res2.data.resultado
        }
        
        )
       
    }

    //se obtiene la producto
    inputChangedHandler1 = (e) => {
        this.setState({ producto: e.target.value })

    }

    //se obtiene la cantidad
    inputChangedHandler2 = (e) => {
        this.setState({ cantidad: e.target.value })

    }

    //se obtiene la cantidad
    inputChangedHandler3 = (e) => {
        this.setState({ precio: e.target.value })

    }




    render() {
        return (
            <div class="container-fluid">
                <div class="stater-template">
                    <h1>Sistemas de ventas</h1>
                    <h3 class="lead">Ventas</h3>
                </div>
                <div class="row">
                    <div class="col">

                    </div>
                    <div class="col-10">
                        <div class="row">
                            <div class="col">
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Producto</label>
                                    <div class="col-sm-10">
                                        <input type="texto" value = {this.state.producto} onChange={this.inputChangedHandler1} class="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputNumber" class="col-sm-2 col-form-label">Cantidad</label>
                                    <div class="col-sm-10">
                                        <input type="texto" value = {this.state.cantidad} onChange={this.inputChangedHandler2} class="form-control" id="inputNumber" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Precio</label>
                                    <div class="col-sm-10">
                                        <input type="texto" value = {this.state.precio} onChange={this.inputChangedHandler3} class="form-control" id="inputText" />
                                    </div>
                                </div>
                                <div>
                                <a class="button" onClick={this.insertar} href="#">Agregar</a>
                                </div>
                            </div>
                            <div class="col">
                                <div>
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th>Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.arreglo2.map((item, i) => (
                                                    <tr key={i}>
                                                      <td>{item.producto}</td>
                                                      <td>{item.cantidad}</td>
                                                      <td>{item.precio}</td>                                                      
                                                    </tr>
                                                  ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="col">

                    </div>
                </div>
            </div>
        )
    }
}