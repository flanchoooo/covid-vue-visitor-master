import store from '@/store';
import axios from 'axios';

store.subscribe((mutation) =>{

    switch (mutation.type) {

        case 'auth/SET_TOKEN':
            axios.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('token');
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
                localStorage.setItem('token',mutation.payload);
            }
        break;

        case 'auth/SET_USER':
            localStorage.setItem('user',JSON.stringify(mutation.payload));
        break;

        case 'auth/SET_COMPANY':
            localStorage.setItem('company',mutation.payload);
        break;


    }

});
