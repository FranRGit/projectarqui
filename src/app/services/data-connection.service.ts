import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, docData, arrayUnion, DocumentReference, DocumentData, setDoc} from '@angular/fire/firestore';
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
  addClientes(cliente: Cliente) {
    const clienteRef = doc(this.firestore, `Clientes/${cliente.ID}`);
    return setDoc(clienteRef, cliente);
  }

  //Obtener cliente
  getClientes():Observable<Cliente[]>{
    return collectionData(collection(this.firestore, "Clientes"),{ idField: 'ID' }) as Observable<Cliente[]>;
  }

  //Obtener documento del cliente
  getClienteDocumento(id: string): DocumentReference<DocumentData> {
    return doc(this.firestore, `Clientes/${id}`);
  }
  
  //Obtener cliente por id
  getClienteByID(id:string): Observable<Cliente> {
    const clienteDocRef = doc(this.firestore, `Clientes/${id}`);
    return docData(clienteDocRef, {idField: 'ID'}) as  Observable<Cliente>;
  }

  //Eliminar empleado
  deleteCLiente(cliente:Cliente){
    const clienteDocRef = doc(this.firestore,  `Clientes/${cliente.ID}`);
    return deleteDoc(clienteDocRef);
  }

  //Ingresar altura empleado
  updateCliente(cliente:Cliente, nuevaAltura:number){
    const empleadoDocRef = doc(this.firestore, `Clientes/${cliente.ID}`);
    return updateDoc(empleadoDocRef, {historial:arrayUnion(nuevaAltura)});
  }

}
