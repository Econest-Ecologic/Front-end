export default function CardPropaganda({ text, img }) {
    return <>
        <div className="col col-lg-4 col-md-6 col-sm-12 justify-content-center">
            <div className="card bg-eco" style={{width:"18rem"}}>
                <img src={img} className="card-img-top p-5" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{text}</h5>
                </div>
            </div>
        </div>
    </>
}