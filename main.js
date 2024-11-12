class Nodo{
    constructor(valor){
        this.valor=valor;
        this.derecha=null;
        this.izquierda=null;
    }
}

class Arbol{
    constructor(){
        this.ruta=null;
    }
    //Metodos
    isEmpty(){
        return this.ruta===null;
    };

    add(valor){
        //verifica si el arbol tiene elementos
        if(this.isEmpty()){
            this.ruta = new Nodo(valor);
            return;
        }

        let aux = this.ruta;

        while(aux){
            if(valor < aux.valor){
                if(aux.izquierda){
                    aux = aux.izquierda;
                }else{
                    aux.izquierda = new Nodo(valor);
                    return;
                }
            }else{
                if(aux.derecha){
                    aux = aux.derecha;
                }else{
                    aux.derecha = new Nodo(valor);
                    return;
                }
            }
        }
    }

    buscar(valor) {
        let aux = this.ruta
        let nivel = 0
    
        while (aux) {
            if (valor === aux.valor) {
                return { nodo: aux, nivel: nivel }
            } else if (valor < aux.valor) {
                aux = aux.izquierda
            } else {
                aux = aux.derecha
            }
            
            nivel++
        }
    
        return null
    }
    
    

    eliminar(valor) {
        this.ruta = this._eliminarNodo(this.ruta, valor);
    }   
    _eliminarNodo(nodo, valor) {
        if (nodo === null) {
            return null;
        }
        if (valor < nodo.valor) {
            nodo.izquierda = this._eliminarNodo(nodo.izquierda, valor);
        } else if (valor > nodo.valor) {
            nodo.derecha = this._eliminarNodo(nodo.derecha, valor);
        } else {
            if (nodo.izquierda === null && nodo.derecha === null) {
                return null;
            }
            if (nodo.izquierda === null) {
                return nodo.derecha;
            } else if (nodo.derecha === null) {
                return nodo.izquierda;
            } 
            let sucesor = this._encontrarMin(nodo.derecha);
            nodo.valor = sucesor.valor;
            nodo.derecha = this._eliminarNodo(nodo.derecha, sucesor.valor); 
        }
        return nodo;
    }
    
    _encontrarMin(nodo) {
        while (nodo.izquierda !== null) {
            nodo = nodo.izquierda;
        }
        return nodo;
    }
    
}

let arbol = new Arbol()

arbol.add(10)
arbol.add(20)
arbol.add(30)
arbol.add(40)
arbol.add(50)
arbol.add(15)
arbol.add(25)
arbol.add(35)

arbol.eliminar(40)

let resultado = arbol.buscar(10);
if (resultado) {
    console.log(`Valor encontrado en el nodo:`, resultado.nodo);
    console.log(`Nivel del nodo: ${resultado.nivel}`);
} else {
    console.log("Valor no encontrado en el árbol.");
}


