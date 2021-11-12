import React from 'react'
import Dfa from './Dfa';
const Nfa = (props) => {
    const dfa = [];
    const find_transition = (nfa, col, src, closure, hash_of_states, state_map) => {

        let n = nfa.length;
        let temp = new Array(n).fill(false);
        // console.log(src);
        // cout << src;
        // let c = 0;
        for (const x of src) {
            if (x === "-")
                continue;

            for (const y of nfa[hash_of_states[x]][col]) {
                if (y !== "," && y !== "-") {
                    temp[hash_of_states[y]] = true;

                    // cout << state_map[hash_of_states[u]];
                }
            }
            // cout << "\n";
        }
        // cout << "\n"
        //      << c;
        let temp1 = new Array(n).fill(false);
        for (let i = 0; i < n; i++) {
            if (temp[i]) {
                for (const y of closure[state_map[i]]) {
                    temp1[hash_of_states[y]] = true;
                }
            }
        }

        let ans = "";
        for (let i = 0; i < n; i++) {
            if (temp1[i]) {
                ans += state_map[i];
            }
        }
        return ans;
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
            dfa[i].push(front);
            q.shift(1);
            for (let j = 0; j < nfa[0].length - 1; j++) {

                let option = find_transition(nfa, j, front, closure, hash_of_states, state_map);
                dfa[i].push(option);
                if (!seen.has(option)) {
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
        for (let i = 0; i < n; i++) {
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
            // cout << state_map[i] << ":";
            let clos = "";
            for (const x of reachable_states[i]) {
                clos += state_map[x];
            }
            closure[state_map[i]] = clos;
            // cout << clos << "\n";
        }
    }
    const closure = (nfa, hash_of_states, state_map) => {
        const states = nfa.length;
        const inputSymbol = nfa[0].length;
        const graph = [];

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
                    // cout << "inside continue\n";

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
            <Dfa dfa={dfa} inputSymbol={props.inputSymbol} />
        </div>
    )
}

export default Nfa;
