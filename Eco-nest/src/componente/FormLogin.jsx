export function FormLogin() {
  
   const verdeTema = '#2F5E36';

       const estiloBorda = {
        border: `1px solid ${verdeTema}`,
        borderRadius: '5px',
        overflow: 'hidden',
    };

  return <>

    
   <div class="d-flex justify-content-center align-items-center min-vh-100 ">
    <div class="col-md-4">
        
        <h3 className="text-center mb-4" style={{color:verdeTema}}> Faça o seu Login </h3>
        
        <form>
            <div class="input-group mb-3 input-login-custom">
                <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                <input type="email" class="form-control" placeholder="Seu e-mail" required />
            </div>

            <div class="input-group mb-3 input-login-custom">
                <span class="input-group-text"><i class="bi bi-lock"></i></span>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Senha" required />
            </div>

            <button type="submit" class="btn btn-lg btn-success w-100">ENTRAR</button>
        </form>
    </div>
</div>
  </>
}