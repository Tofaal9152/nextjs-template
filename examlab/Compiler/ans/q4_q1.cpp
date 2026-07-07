#include <bits/stdc++.h>
using namespace std;

bool isScientificVariable(const string& token) {
    if (token.size() < 3) return false;
    if (!(token[0] == 's' || token[0] == 'S')) return false;
    if (token[1] != '_') return false;

    for (int i = 2; i < token.size(); i++) {
        if (!isalnum((unsigned char)token[i])) return false;
    }
    return true;
}

bool isHexDigit(char c) {
    return isdigit((unsigned char)c) ||
           (c >= 'a' && c <= 'f') ||
           (c >= 'A' && c <= 'F');
}

bool isHexadecimalLiteral(const string& token) {
    if (token.size() < 3) return false;
    if (token[0] != '0' || token[1] != 'x') return false;

    for (int i = 2; i < token.size(); i++) {
        if (!isHexDigit(token[i])) return false;
    }
    return true;
}

bool isOctalNumber(const string& token) {
    if (token.size() < 2) return false;
    if (token[0] != '0') return false;

    for (int i = 1; i < token.size(); i++) {
        if (token[i] < '0' || token[i] > '7') return false;
    }
    return true;
}

int main() {
    freopen("input.txt", "r", stdin);

    string token;
    cout << left << setw(15) << "Token" << "| Classification\n";
    cout << "----------------------------------------\n";

    while (cin >> token) {
        cout << left << setw(15) << token << "| ";

        if (isScientificVariable(token)) {
            cout << "Scientific Variable";
        }
        else if (isHexadecimalLiteral(token)) {
            cout << "Hexadecimal Literal";
        }
        else if (isOctalNumber(token)) {
            cout << "Octal Number";
        }
        else {
            cout << "Invalid Input or Undefined";
        }
        cout << '\n';
    }

    return 0;
}
