export default function Banner({link}){
    return<>
        <div className="container-fluid d-flex w-100 m-0 p-0 bg-white position-relative ">
          <img
            src={link}
            className="w-100 m-0 p-0 object-fit-cover"
            style={{ maxHeight: "50vh" }}
            alt="Banner"
          />
        </div>
    </>
}