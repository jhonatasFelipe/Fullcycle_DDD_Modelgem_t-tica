export type NotificationErrorProps = {
    message: string;
    context: string;
};


export default class Notification{

    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps):void{
        this.errors.push(error);
    }

    messages(context?:string):string{  
        let errors  = [...this.errors];  
        if(context){
            errors = this.errors
            .filter((error) => error.context === context);
        }
        return errors
        .map((error) => `${error.context}: ${error.message}`)
        .join(",");
    }

    hasErrors():boolean{
        return this.errors.length > 0
    }

    getErrors(): NotificationErrorProps[]{
        return this.errors;
    }
        


}