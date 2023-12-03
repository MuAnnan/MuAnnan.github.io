#include <stdio.h>

void quickpass(int r[], int s, int t) {    //  s-Ki  t=length-1
    int i=s, j=t, x=r[s];
    while(i<j){
        while(i<j && r[j]>x) j=j-1;
        if(i<j){
            r[i]=r[j];
            i=i+1;
        }
        while(i<j && r[i]<x) i=i+1;
        if(i<j){
            r[j]=r[i];
            j=j-1;
        }
    }
    r[i]=x;
}

int main(){
    int r[7] = {8,7,6,9,2,3,5};
    quickpass(r, 0, 6);
    printf("%d %d %d %d %d %d %d",r[0],r[1],r[2],r[3],r[4],r[5],r[6]);
    return 0;
}