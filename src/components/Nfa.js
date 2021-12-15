import React from 'react'
import Dfa from './Dfa';
const Nfa = (props) => {
    const dfa = [];
    const final_states_of_dfa = [];
    const isfinal = (new_state) => {
        let f = false;
        let n = props.states.length;
        let parsed_new_state = new_state.split(",");

        for (let x of parsed_new_state) {
            if (x === props.states[n - 1]) {
                f = true;
            }
        }
        if (f)
            final_states_of_dfa.push(new_state.replaceAll(",", ""));
    }
    const find_transition = (nfa, col, src, closure, hash_of_states, state_map) => {

        let n = nfa.length;
        let temp = new Array(n).fill(false);
        let state_parse = src.split(",");
        for (const x of state_parse) {
            let parsed_nfa = nfa[hash_of_states[x]][col].split(",");
            for (const y of parsed_nfa) {
                if (y !== "-") {
                    temp[hash_of_states[y]] = true;
                }
            }
        }

        let temp1 = new Array(n).fill(false);
        for (let i = 0; i < n; i++) {
            if (temp[i]) {
                let parsed_closure = closure[state_map[i]].split(",");
                for (const y of parsed_closure) {
                    temp1[hash_of_states[y]] = true;
                }
            }
        }

        let ans = "";
        for (let i = 0; i < n; i++) {
            if (temp1[i]) {
                ans += state_map[i] + ",";
            }
        }
        return ans.slice(0, -1);
    }
    const nfa_to_dfa = (closure, nfa, start, hash_of_states, state_map) => {
        const q = [];
        q.push(start);
        let seen = new Set();
        seen.add(start)
        let i = 0;
        while (q.length !== 0) {
            dfa[i] = [];
            let front = q[0];
            isfinal(front);
            dfa[i].push(front.replaceAll(",", ""));
            q.shift(1);
            for (let j = 0; j < nfa[0].length - 1; j++) {

                let option = find_transition(nfa, j, front, closure, hash_of_states, state_map);
                if (!option.length)
                    dfa[i].push("-");
                else
                    dfa[i].push(option.replaceAll(",", ""));
                if (!seen.has(option) && option.length) {
                    q.push(option);
                    seen.add(option);
                }
            }
            i++;

        }

    }

    const dfs = (graph, src, visited) => {
        //DFS to find all reachable node from given node
        visited[src] = true;
        for (const x of graph[src]) {
            if (!visited[x])
                dfs(graph, x, visited);

        }
        return;
    }

    const find_closure = (graph, reachable_states, n) => {
        for (let i = 0; i < n; i++) { //n=states
            const visited = new Array(n).fill(false);

            dfs(graph, i, visited);

            reachable_states[i] = [];
            for (let j = 0; j < n; j++) {
                if (visited[j])
                    reachable_states[i].push(j);
            }
        }

    }

    const store_closure = (reachable_states, state_map, closure) => {


        for (let i = 0; i < reachable_states.length; i++) {
            let clos = "";
            for (const x of reachable_states[i]) {
                clos += state_map[x] + ",";
            }
            closure[state_map[i]] = clos.slice(0, -1);
        }
    }

    const closure = (nfa, hash_of_states, state_map) => {
        const states = nfa.length;
        const inputSymbol = nfa[0].length;
        const graph = [];
        ///Graph logic
        for (let i = 0; i < states; i++) {
            graph[i] = [];
            let s = "";
            for (let j = 0; j < nfa[i][inputSymbol - 1].length; j++) {

                let x = nfa[i][inputSymbol - 1][j];
                if (x === ",") {
                    graph[i].push(hash_of_states[s]);

                    s = "";
                }
                else if (x === "-") {
                    continue;
                }
                else
                    s += x;
            }
            if (s.length !== 0)
                graph[i].push(hash_of_states[s]);
        }
        const reachable_state = [];
        const closure = new Map();
        find_closure(graph, reachable_state, states);
        store_closure(reachable_state, state_map, closure);
        nfa_to_dfa(closure, nfa, closure[state_map[0]], hash_of_states, state_map);
    }

    const hash_of_states = new Map();
    props.states.map((val, i) => {
        return hash_of_states[val] = i;
    })

    closure(props.nfa, hash_of_states, props.states);

    return (
        <div>
            <Dfa dfa={dfa} inputSymbol={props.inputSymbol} final_state={final_states_of_dfa} />
        </div>
    )
}

export default Nfa;
