#include <bits/stdc++.h>
using namespace std;

string trim(string s) {
    while (!s.empty() && isspace((unsigned char)s.front())) s.erase(s.begin());
    while (!s.empty() && isspace((unsigned char)s.back())) s.pop_back();
    return s;
}

vector<string> splitAlternatives(const string& rhs) {
    vector<string> parts;
    string current;

    for (char c : rhs) {
        if (c == '|') {
            parts.push_back(trim(current));
            current.clear();
        }
        else {
            current += c;
        }
    }
    parts.push_back(trim(current));

    return parts;
}

bool isNonTerminal(char c) {
    return c >= 'A' && c <= 'Z';
}

bool isTerminal(char c) {
    return c >= 'a' && c <= 'z';
}

bool isValidCNFProduction(char left, const string& right, char startSymbol, bool startAppearsOnRHS) {
    // CNF form: A -> BC
    if (right.size() == 2 && isNonTerminal(right[0]) && isNonTerminal(right[1])) {
        return true;
    }

    // CNF form: A -> a
    if (right.size() == 1 && isTerminal(right[0])) {
        return true;
    }

    // Optional CNF exception: S -> epsilon, written as @
    if (right == "@" && left == startSymbol && !startAppearsOnRHS) {
        return true;
    }

    return false;
}

int main() {
    freopen("grammar.txt", "r", stdin);

    vector<pair<char, string>> productions;
    string line;
    char startSymbol = '\0';

    while (getline(cin, line)) {
        line = trim(line);
        if (line.empty()) continue;

        int arrowPosition = line.find("->");
        if (arrowPosition == string::npos) {
            cout << line << " : Invalid production format\n";
            continue;
        }

        string leftPart = trim(line.substr(0, arrowPosition));
        string rightPart = trim(line.substr(arrowPosition + 2));

        if (leftPart.size() != 1 || !isNonTerminal(leftPart[0])) {
            cout << line << " : CNF Violation - left side must be one non-terminal\n";
            continue;
        }

        char left = leftPart[0];
        if (startSymbol == '\0') startSymbol = left;

        vector<string> alternatives = splitAlternatives(rightPart);
        for (string right : alternatives) {
            productions.push_back({left, right});
        }
    }

    bool startAppearsOnRHS = false;
    for (auto production : productions) {
        string right = production.second;
        for (char c : right) {
            if (c == startSymbol) {
                startAppearsOnRHS = true;
            }
        }
    }

    cout << left << setw(15) << "Production" << "| Result\n";
    cout << "----------------------------------------\n";

    bool hasViolation = false;

    for (auto production : productions) {
        char left = production.first;
        string right = production.second;
        string fullProduction = string(1, left) + " -> " + right;

        cout << left << setw(15) << fullProduction << "| ";

        if (isValidCNFProduction(left, right, startSymbol, startAppearsOnRHS)) {
            cout << "Valid CNF";
        }
        else {
            cout << "CNF Violation";
            hasViolation = true;
        }
        cout << '\n';
    }

    cout << "\nFinal Result: ";
    if (hasViolation) {
        cout << "The grammar is not in Chomsky Normal Form.\n";
    }
    else {
        cout << "The grammar is in Chomsky Normal Form.\n";
    }

    return 0;
}
