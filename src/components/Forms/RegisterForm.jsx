
import style from './Form.module.css'

export default function RegisterForm({setNewUser}) {
  return (
    <form className={style.formContainer}>
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <input type="password" name="" id="" />
      <input type="password" name="" id="" />
      <input type="submit" value="Register" />
      <p>
        Already A User? <span className={style.toggle}  onClick={()=>{setNewUser(false)}}>Login</span>
      </p>
    </form>
  );
}
