import React, {ReactElement} from "react";

import {useSelector} from "react-redux";
import {TranslationsStore} from "store/types";

interface PropsPermissionsProvider {
    child: ReactElement,
    privileges: string[]
}

export const checkPermissions = (privileges: string[], privilegeUser: string) => {
    return privileges.includes(privilegeUser);
};

const PermissionsProvider: React.FC<any> = (props: PropsPermissionsProvider) => {
    const privilegeUser: string = useSelector((state: TranslationsStore) => state.user.privilege);
    return (
        props.privileges.includes(privilegeUser) ? props.child : null
    )
};

export default PermissionsProvider;
