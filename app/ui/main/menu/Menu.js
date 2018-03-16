import React from 'react'
import { Link } from 'react-router-dom'


class Menu extends React.Component{




    render(){
        return (
            <div>
                <table>
                    <tr>
                        <td><Link to="/main/user">用户</Link></td>
                        <td><Link to="/main/premission">权限</Link></td>
                        <td><Link to="/main/role">角色</Link></td>
                        <td><Link to="/main/jcr">Jcr</Link></td>
                    </tr>
                </table>
            </div>
        );
    }
}


export default Menu;