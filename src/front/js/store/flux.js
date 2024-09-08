const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // Contact-list API
            host: 'https://playground.4geeks.com/contact',
            message: null,
            user: 'anthobetto',
            contacts: [],
            currentContacts: {},

            // Star Wats API
            hostStarWarsAPI: 'https://swapi.tech/api',
            characters: [],
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
            },
            getContacts: async () => {
                const uri = `${getStore().host}/agendas/${getStore().user}`;
                const options = {
                    method: 'GET'
                };
                try {
                    const response = await fetch(uri, options);
                    if (!response.ok) {
                        console.log("Agenda no encontrada. Intentando crear una nueva agenda...");
                        const userCreated = await getActions().createUser();
                        if (userCreated) {
                            return getActions().getContacts();
                        } else {
                            console.error("Error al crear la agenda. No se pueden obtener contactos.");
                            return;
                        }
                    }
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                    console.log("Contactos obtenidos correctamente:", data.contacts);
                } catch (error) {
                    console.error("Error al obtener contactos:", error);
                }
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
            // Star Wars

            getCharacters: async () => {
				const uri = `${getStore().hostStarWarsAPI}/people`
				const options = {
					headers: {"Content-Type": "application/json"},
					method: 'GET'
				}
				const response = await fetch(uri, options)
				console.log(response);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText)
					return
				}
				const data = await response.json()
				setStore({characters: data.results})
                
			},

        }
    };
};
export default getState;