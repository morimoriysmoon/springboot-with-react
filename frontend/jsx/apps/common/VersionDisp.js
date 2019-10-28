import React from 'react';
import Typography from "@material-ui/core/Typography";

const VersionDisp = ({versionNo}) => {
    return (
        <div>
            <Typography variant="caption" display="block">
                Version{' '}<strong>{versionNo}</strong>
            </Typography>
        </div>
    )
}

export default VersionDisp;