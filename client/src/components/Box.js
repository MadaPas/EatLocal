/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { GeneralContext } from '../context/General';

const Box = props => {
    const { box } = props;
};

Box.propTypes = {
    box: PropTypes.arrayOf(
        PropTypes.any,
    ).isRequired,
};

export default Box;
