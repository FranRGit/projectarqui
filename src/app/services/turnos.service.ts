import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, orderBy, query, DocumentReference, docData, where} from '@angular/fire/firestore';
import { Turno } from '../Interfaces/Turno';
import { map, Observable } from 'rxjs';
import { update } from '@angular/fire/database';
import { Cliente } from '../Interfaces/Cliente';
import { DataConnectionService } from './data-connection.service';

@Injectable({
    providedIn: 'root'
})
export class TurnoService {

    constructor(private firestore: Firestore, private clienteService:DataConnectionService) {}

    async addTurno(turno: Turno, clienteRef: DocumentReference): Promise<void> {
        try {
            const turnoRef = await addDoc(collection(this.firestore, 'Turnos'), {
            ...turno,
            cliente: clienteRef,
            });
        } catch (error) {
            console.error('Error guardando turno: ', error);
        }
    }

    getTurnos(): Observable<Turno[]> {
        const turnoCollection = collection(this.firestore, 'Turnos');
        const turnoQuery = query(turnoCollection, orderBy('timestamp'));
        return collectionData(turnoQuery, { idField: 'ID' }) as Observable<Turno[]>;
    }

    getTurnosPorEstado(estado: string): Observable<Turno[]> {
        const turnoCollection = collection(this.firestore, 'Turnos');
        const turnoQuery = query(turnoCollection, where('estado', '==', estado), orderBy('timestamp'));
        return collectionData(turnoQuery, { idField: 'ID' }) as Observable<Turno[]>;
    }

    getTurnoByID(id:string): Observable<Turno> {
        const turnoDocRef = doc(this.firestore, `Turnos/${id}`);
        return docData(turnoDocRef, {idField: 'ID'}) as  Observable<Turno>;
    }


    getTurnoByCliente(clientID: string): Observable<Turno | null> {
        const clienteRef = this.clienteService.getClienteDocumento(clientID);
        const turnoQuery = query(collection(this.firestore, 'Turnos'), where('cliente', '==', clienteRef));
        return collectionData(turnoQuery, { idField: 'ID' }).pipe(
            map((turnos: any[]) => {
                console.log('Turnos encontrados:', turnos); 
                return turnos.length > 0 ? turnos[0] as Turno : null;
            })
        );
    }

    getEstadoTurnoByID(id: string): Observable<string> {
        const turnoDocRef = doc(this.firestore, `Turnos/${id}`);
        return docData(turnoDocRef).pipe(
            map((data: any) => data.estado as string)
        );
    }
    
    getClienteFromTurno(turno: Turno): Observable<Cliente> {
        return docData(turno.cliente) as Observable<Cliente>;

    }
    updateTurnoEstado(turnoId: string) {
        const clienteDocRef = doc(this.firestore, `Turnos/${turnoId}`);
        return updateDoc(clienteDocRef, {estado:"Atendido"});    }

    removeTurno(turnoId: string) {
        const turnoDocRef = doc(this.firestore,  `Turnos/${turnoId}`);
        return deleteDoc(turnoDocRef);    
    }
}
