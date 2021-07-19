import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import './pagination.css'
import Table from 'react-bootstrap/Table'

function Pagination(props) {

    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);   
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0) 

    const getData = () => {
        const data = props.data;
        const slice = data.slice(offset, offset + perPage)
        const postData = slice.map((university, index) => { 
            return (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index+1}</td>
                    <td>{university.name}</td>
                    <td style={{paddingLeft:'65px'}}>{university.domains[0]}</td>
                </tr> 
            )
        })
        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))
    }

    // const header = () => {
    //     return (
    //       <tr>
    //         <th> S.No </th>
    //         <th> University Name </th>
    //         <th> Domain Name </th>
    //       </tr>
    //     )
    // }

    useEffect(() => {
        getData()
    }, [offset])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <div>
            <Table striped bordered hover size="sm">
               <thead> 
                    <tr>
                        <th> S.No </th>
                        <th style={{paddingRight:'150px'}}> University Name </th>
                        <th style={{paddingLeft:'75px'}}> Domain Name </th>
                    </tr>
                </thead>

               <tbody>  
                    {data}
                </tbody>
                </Table>
                <div className="pagination" style={{ display: "flex", justifyContent: "center" }}>
                        <ReactPaginate
                            style={{ display: "flex", justifyContent: "center" }}
                            previousLabel={"prev"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                    </div>

         </div>
    )
} 

export default Pagination 