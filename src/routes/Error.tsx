const queryParams = new URLSearchParams(window.location.search);

export default function Error() {
    const reason = queryParams.get("reason");
    return (
        <div>
            <h1>{reason}</h1>
        </div>
    );
}
