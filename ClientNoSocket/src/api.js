export const serverUrl = "http://localhost:12345";
const apistart = `${serverUrl}/api/`


export async function Registration(user){
    const val = {
        username : user.username,
        password: user.password,
        displayName: user.nickname,
        profilePic: user.photo,
    }
    try {
        const res =  await fetch(apistart + "Users",{
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
        username : username,
        password: password,
        }
    let response = {}
    try{
        response = await fetch(apistart + "Tokens",{
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
        response = await fetch(`http://localhost:12345/api/Users/${username}`,{
            method: "get",
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
    let response = {}
    try{
        response = await fetch(`http://localhost:12345/api/Chats`,{
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
        response = await fetch(`http://localhost:12345/api/Chats`,{
            method: "get",
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
    let response = {}
    try {
        response = await fetch(`http://localhost:12345/api/Chats/${id}/Messages`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
    }
    catch (error) {
        console.error("Error:", error);
    }

    if (!response.ok) {
        return null;
    }
    return await response.json();
}



export async function sendMessageToChat(id, msg){

    let response = {}
    try{
        response = await fetch(`http://localhost:12345/api/Chats/${id}/Messages`,{
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
