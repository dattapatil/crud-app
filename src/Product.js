import {useState, useEffect, useRef} from 'react';
import axios from 'axios'; 

function Product(){

    useEffect(()=>{
        getProduct();
    },[])
  

const [product, setProduct] = useState(
    {
        name: "",
        description: "",
        richDescription: "",
        image: "",
        brand: "",
        price: 0,
        category: "",
        countInStock: 0,
        rating: 0
    }
);
const [products, setProducts] = useState([]);

const form = useRef();

let getProduct = async ()=>{
    const response = await axios.get("http://localhost:8089/api/v1.0.0/product/list");
    console.log(response);
    setProducts(response.data.products)
}

const renderTableHead = ()=>{    
    const tableHeadKey = Object.keys(product);     
    const index = tableHeadKey.indexOf("category")
    tableHeadKey.splice(index, 1);
    let listofTh = tableHeadKey.map(
        (ths)=>{
            return <th>{ths}</th> 
        }
    );
    return listofTh;
}

const renderTable = ()=>{
   let rowlist = products.map((productitem)=>{
       return <tr>
            <td>{productitem.name}</td>
            <td>{productitem.description}</td>
            <td>{productitem.richDescription}</td>
            <td>{productitem.image}</td>
            <td>{productitem.brand}</td>
            <td>{productitem.price}</td>
            {/* <td>{productitem.category}</td> */}
            <td>{productitem.countInStock}</td>
            <td>{productitem.rating}</td>
            <td><button className='btn btn-sm btn-success'>Edit</button></td>
            <td><button className='btn btn-sm btn-danger' onClick={() => deleteProduct(productitem._id)}>Delete</button></td>
        </tr>
    })
    return rowlist;
}

const updateForm = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    setProduct({...product, [name]:value});
}
const formSubmit = async (event) =>{
    event.preventDefault();
    const response = await axios.post("http://localhost:8089/api/v1.0.0/product/add", product)
    console.log(product);
    console.log(response);
    if(response.data.success){
        form.current.reset();
        getProduct();
    }
}

const deleteProduct = async (id)=>{
    console.log(id);
    const response = await axios.delete("http://localhost:8089/api/v1.0.0/product/" + id);
    if(response.data.success){
        getProduct();
    }
}

return(
    <div>
     <h1 className='mb-3'>Add Product</h1>
     <form ref={form}>    
                <div className="row">
                <div className="col-md-10">
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">Name: </label>
                  <div className="col-sm-9"><input onChange={updateForm} type="text" className='form-control' name="name"></input> </div>
                </div>
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">Description: </label> 
                  <div className="col-sm-9"><input  onChange={updateForm} type="text" className='form-control' name="description"></input> </div>
                </div>
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">RichDescription: </label> 
                  <div className="col-sm-9"><input  onChange={updateForm} type="text" className='form-control' name="richDescription"></input> </div>
                </div>
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">Image: </label>
                  <div className="col-sm-9"> <input  onChange={updateForm} type="text" className='form-control' name="image"></input> </div>
                 </div>
                <div className="mb-2 row">
                 <label className="col-sm-3 form-label">Brand: </label> 
                  <div className="col-sm-9"><input  onChange={updateForm} type="text" className='form-control' name="brand"></input> </div>
                </div>
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">Price: </label> 
                 <div className="col-sm-9"> <input  onChange={updateForm} type="text" className='form-control' name="price"></input> </div>
                </div>
                {/* <label>category: </label> <input onChange={updateForm} type="text" name="category"></input> */}
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">CountInStock: </label> 
                  <div className="col-sm-9"><input  onChange={updateForm} type="text" className='form-control' name="countInStock"></input> </div>
                </div>
                <div className="mb-2 row">
                <label className="col-sm-3 form-label">Rating: </label> 
                  <div className="col-sm-9"><input  onChange={updateForm} type="text" className='form-control' name="rating"></input> </div>
                </div>
                <div className="mb-2 row">
                  <div className='col-sm-3'> </div>
                  <div className='col-sm-9'><button className='btn btn-primary' onClick={formSubmit}>Add Product</button></div>
                </div>
                </div>
                </div>
            </form>

            <hr></hr>
            <table className='table table-striped'>
                <thead>
                 <tr> 
                  {renderTableHead()} 
                 <th colSpan="2">Oprations</th>
                 </tr> 
                 
                {/* <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>richDescription</th>
                    <th>image</th>
                    <th>brand</th>
                    <th>price</th>
                    <th>category</th>
                    <th>countInStock</th>
                    <th>rating</th>
                    <th colSpan="2">Oprations</th>
                </tr> */}
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </table>
</div>
);

}
export default Product;