import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, private firestore:Firestore) { }

  register(email:any,password:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login(email:any,password:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  logout(){
    return signOut(this.auth);
  }

  getClienteData(userId: string) {
    const clienteRef = doc(this.firestore, `Clientes/${userId}`);
    return getDoc(clienteRef);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
