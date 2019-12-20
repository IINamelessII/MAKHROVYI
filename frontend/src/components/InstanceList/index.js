import React, {Component} from 'react';
import axios from 'axios';
import * as Cookies from 'js-cookie';
import './style.css';


class InstanceList extends Component {
    state = {
        instances: [],
    }

    componentDidMount() {
        this.getInstances();
    };

    render() {
        return (
            <div className="instance-list">
                {this.state.instances.map((instance) => (
                    <div className="instance">
                        <div className='instance-id'>
                            {instance.id}
                        </div>
                        <div className='instance-name'>
                            {instance.name}
                        </div>
                        <div className='instance-description'>
                            {instance.description}
                        </div>
                        <div className="instance-download" onClick={() => this.download(instance.id)}>
                            Download
                        </div>
                        
                    </div>
                ))}
            </div>
        );
    };

    async getInstances(){
        let data = await fetch("api/instances/");
        data = await data.json();
        this.setState(
            {
                instances: data
            }
        );
        console.log(data);
    }

    download(id){
        axios.post(
            "download/", 
            {"id": id}, 
            {
                headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')},
                responseType: "blob"
            },
        )
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "filename"); //TODO: Change into filename from response
            document.body.appendChild(link);
            link.click();
         });
    }
};
export default InstanceList;
