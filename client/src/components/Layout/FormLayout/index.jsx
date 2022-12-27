function FormLayout({children}) {
    return ( 
        <div className="flex justify-center items-center relative bg-log-bg h-screen">
            {children}
        </div>
    );
}

export default FormLayout;