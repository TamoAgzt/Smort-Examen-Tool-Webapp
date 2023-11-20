export class Statics {
    static Token:string = window.localStorage.getItem("Vista.Examen.Token.Planner") ?? "";
    static Rol:string =  window.localStorage.getItem("Vista.Examen.Rol.Planner") ?? "";
}