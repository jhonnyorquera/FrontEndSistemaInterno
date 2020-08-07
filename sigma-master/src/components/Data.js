import React, {Component} from 'react';
import axios from 'axios';

import {DataTable} from 'primereact/datatable';

import {Column} from 'primereact/column'



export class Data extends Component {

  
  state = {
    articles: []

  };
  
    

    componentWillMount() {
  

                        this.getLastArticles();
     
    }



    
    getLastArticles = () => {
        axios.get('http://localhost:8080/api/Articulo/')
            .then(res => {

                this.setState(
                    {
                        articles: res.data
                    });
            });

            console.log('artucylos: '+this.state.articles);

    }


    

    render() {
	
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1>Articulos</h1>
                        <DataTable value={this.state.articles} paginatorPosition="both" selectionMode="single" header="List of Cars" paginator={true} rows={10}
                            responsive={true} selection={this.state.dataTableSelection} onSelectionChange={event => this.setState({dataTableSelection: event.value})}>
                            <Column field="id" header="Vin" sortable={true}/>
                            <Column field="nombre" header="Year" sortable={true}/>
                            <Column field="descripcion" header="Year" sortable={true}/>
                            <Column field="cantidad" header="Year" sortable={true}/>
                            <Column field="descuento" header="Year" sortable={true}/>
      
                        
                        </DataTable>
                    </div>
                </div>

            
            

                </div>
      
        );
    }
}