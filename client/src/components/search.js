import React from 'react';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

export default (props) => {
    return(
        <div>
            <FormControl>
                <InputLabel>Enter Stock Symbol</InputLabel>
                <Input/>
            </FormControl>
        </div>
    );
}