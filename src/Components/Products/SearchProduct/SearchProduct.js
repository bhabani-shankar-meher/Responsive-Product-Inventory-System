import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

export default function SearchProduct({ id, onInput }) {
    return (
        <Paper
            component="form"
            sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            variant="outlined"
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Product"
                inputProps={{ "aria-label": "search product" }}
                id={id}
                onInput={onInput}
                autoFocus={true}
            />
        </Paper>
    );
}
