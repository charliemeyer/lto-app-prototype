const CompanyPage = ({ params }: { params: { id: string } }) => {
    return <h1>Company ID: {params.id}</h1>;
};

export default CompanyPage;
