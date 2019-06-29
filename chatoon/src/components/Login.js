import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                 <form onSubmit={e => this.handleSubmit(e)}>
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="your email"
                            value={this.email}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <input
                            name="Password"
                            type="password"
                            placeholder="Password"
                            value={this.Password}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <input type="submit" value="submit" />
                    </form>
            </div>
        )
    }
}
