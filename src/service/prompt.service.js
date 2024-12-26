import axios from "axios";

const base_url = `http://localhost:3000`

class PromptService {

    async fetchPromptResposne(prompt) {
        try {
            const response = await axios.post(`${base_url}/prompt/response`, { prompt });
            if(!response.data.status) {
                throw new Error(`Error in creating order`)
            }
            return response.data.data;
        } catch(err) {
            console.error(`Error in creating order from backedn \n` + err);
            return null;
        }
    }

 
}

export default new PromptService();