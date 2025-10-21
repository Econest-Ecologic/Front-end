export default function CardPropaganda({ text, img,onClick }) {
    return <>
        <div className="col col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" onClick={onClick}>
            <div className="card bg-eco" style={{width:"18rem"}}>
                <img src={img} className="card-img-top p-5" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-center">{text}</h5>
                </div>
            </div>
        </div>
    </>
}