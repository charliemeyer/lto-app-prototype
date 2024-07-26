const ContactPage = ({ params }: { params: { id: string } }) => {
    return <h1>Contact ID: {params.id}</h1>;
};

export default ContactPage;
