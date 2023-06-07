const serverUrl = "http://localhost:12345/api"


export async function Registration(user){
    const val = {
        Username : user.username,
        Password: user.password,
        DisplayName: user.nickname,
        ProfilePic: user.photo,
    }
    try {
        const res =  await fetch(serverUrl + "/Users",{
            method: "post",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val)
        }).catch((e)=> {
            console.log("Error", e)
        })
        if (res.ok) {
            return 0;
        }
        return 1;
    } catch(e) {
        console.error("Error:",e)
    }
    
    // if (!response.ok){
    //     return 0;
    // }
    return 0;
   
}


export async function Connection(username,password){
    const val = {
        Username : username,
        Password: password,
        }
    let response = {}
    try{
        response = await fetch(serverUrl + "/Tokens",{
            method: "post",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val)
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return 0;
    }
    return await response.text();
   
}

export async function getUserInfo(username){

    let response = {}
    try{
        response = await fetch(`${serverUrl}/Users/${username}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return null;
    }
    return await response.json();
   
}

export async function postChat(username){

    console.log("bbbbbb",localStorage.getItem('token'));
    let response = {}
    try{
        response = await fetch(`${serverUrl}/Chats`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({username})
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return null;
    }
    return await response.json();
   
}


export async function getChat(){

    let response = {}
    try{
        response = await fetch(`${serverUrl}/Chats`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return null;
    }
    return await response.json();
   
}


export async function getMessages(id){

    console.log("bbbbbb",localStorage.getItem('token'));
    let response = {}
    
    try{
        response = await fetch(`${serverUrl}/Chats/${id}/Messages`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return null;
    }
    return await response.json();
   
}


export async function sendMessageToChat(id, msg){

    let response = {}
    try{
        response = await fetch(`${serverUrl}/Chats/${id}/Messages`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ msg })
        });
    }
    catch (error){
        console.error("Error:",error)
    }
    
    if (!response.ok){
        return null;
    }
    return await response.json();
   
}

