const RegisterForm = () => {
    return (
        <form>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" name="nickname" />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <label htmlFor="repeat-password">Repeat Password</label>
            <input type="password" name="repeat-password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;
