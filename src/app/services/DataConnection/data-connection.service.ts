import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, docData, arrayUnion} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/Interfaces/Cliente';

@Injectable({
  providedIn: 'root'
})
export class DataConnectionService {

  constructor(private firestore:Firestore) { }

  //METODOS CLIENTES

  //Agregar cliente
  addClientes(cliente:Cliente){
    return addDoc(collection(this.firestore, "Clientes"),cliente);
  }

  //Obtener cliente
  getClientes():Observable<Cliente[]>{
    return collectionData(collection(this.firestore, "Clientes"),{ idField: 'ID' }) as Observable<Cliente[]>;
  }

  //Obtener cliente por ID
  getClienteByID(id: string): Observable<Cliente>{
    const empleadoDocRef = doc(this.firestore, `Clientes/${id}`);
    return docData(empleadoDocRef, { idField: 'ID' }) as Observable<Cliente>;  
  }
  //Eliminar empleado
  deleteEmpleado(cliente:Cliente){
    const clienteDocRef = doc(this.firestore,  `Clientes/${cliente.ID}`);
    return deleteDoc(clienteDocRef);
  }

  //Ingresar altura empleado
  updateEmpleado(cliente:Cliente, nuevaAltura:number){
    const empleadoDocRef = doc(this.firestore, `Clientes/${cliente.ID}`);
    return updateDoc(empleadoDocRef, {historial:arrayUnion(nuevaAltura)});
  }

}
