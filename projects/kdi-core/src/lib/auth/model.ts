
/**
 * JSON Auth informations
 */
export class Auth{
    token: string ;
    ttl_token: number ;
    refresh_token: string;
    timelimit_token: number;
    user: User = new User();
  }

  /**
   * JSON User informations
   */
  export class User {
    id: number ;
    username: string ;
    email: string ;
    roles: string[]; 
  } 


  /**
   * Auth Forms class 
   */
export class Login {
  username: string;
  password: string;
  remember: boolean;
}

export class ForgotPassword{
  email: string;
}

export class Reset{
  email: string;
  password: string;
  confirm: string;
}

export class Register{
  email: string;
  username: string;
  password: string;
  confirm: string;
}