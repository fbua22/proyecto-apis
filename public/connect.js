class Connect {

    logout() {
        const fetchOptions = {
            method: 'POST',            
        };
        
        return fetch('/logout/', fetchOptions);
    }
}


export default Connect;