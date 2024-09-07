const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            host: 'https://playground.4geeks.com/contact',
            message: null,
            user: 'anthobetto',
            contacts: [],
            currentContacts: {},
        },
        actions: {
            getMessage: async () => {
                const response = await fetch(process.env.BACKEND_URL + "/api/hello")
                if (!response.ok) {
                    console.log("Error loading message from backend", response.status, response.statusText);
                    return;
                }
                const data = await response.json()
                setStore({ message: data.message })
                // don't forget to return something, that is how the async resolves
                return data;
            },
            setCurrentContacts: (contacts) => { setStore({currentContacts: contacts}) },
            createUser: async () => {
                const uri = `${getStore().host}/agendas/${getStore().user}`;
                const options = {
                    method: 'POST'
                }
                const response = await fetch(uri, options)
                if (!response.ok) {
                    return
                }
                getContacts()
            },
            getContacts: async () => {
                const uri = `${getStore().host}/agendas/${getStore().user}`;
                const options = {
                    method: 'GET'
                };
                const response = await fetch(uri, options);
                console.log(response);
                if (!response.ok) {
                    return createUser()
                }
                const data = await response.json();
                setStore({contacts: data.contacts});
            },
            editContact: async (id, dataToSend) => {
                const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${id}`
                const options = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                }
                const response = await fetch(uri, options)
                if (!response.ok) {
                    return
                }
                getActions().getContacts();
            },
            addContact: async (dataToSend) => {
                const uri = `${getStore().host}/agendas/${getStore().user}/contacts`;
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    return;
                }
                getActions().getContacts()
            },
            deleteContact: async (designateNumber) => {
                const uri = `${getStore().host}/agendas/${getStore().user}/contacts/${designateNumber}`;
                const options = {
                    method: 'DELETE'
                };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    return;
                }
                getActions().getContacts();
            },
        }
    };
};
export default getState;