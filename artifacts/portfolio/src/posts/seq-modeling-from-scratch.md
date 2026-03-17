---
title: "Implementing LSTM from Scratch: Gating Mechanisms and BPTT"
date: "2025-11-10"
description: "A deep walkthrough of implementing Long Short-Term networks entirely from first principles using only NumPy — forward pass, backward pass, and Backpropagation Through Time."
tags: ["Sequence Models", "LSTM", "NumPy", "Deep Learning"]
---

## Why From Scratch?

Frameworks like PyTorch abstract away the mechanics of gating, gradient flow, and time-unrolled computation graphs. Building an LSTM with only NumPy forces you to confront the math directly — and understand *why* LSTM solves the vanishing gradient problem that crippled vanilla RNNs.

---

## The Vanilla RNN Problem

A vanilla RNN updates its hidden state as:

$$h_t = \tanh(W_h h_{t-1} + W_x x_t + b)$$

During **Backpropagation Through Time (BPTT)**, the gradient of the loss at time $T$ with respect to $h_t$ involves a product of Jacobians:

$$\frac{\partial h_T}{\partial h_t} = \prod_{k=t}^{T-1} \frac{\partial h_{k+1}}{\partial h_k} = \prod_{k=t}^{T-1} W_h^\top \cdot \text{diag}(\tanh'(z_k))$$

If the spectral radius of $W_h$ is less than 1, this product **exponentially vanishes**. If greater than 1, it **explodes**.

---

## LSTM Gates

The LSTM introduces a **cell state** $c_t$ — a highway for gradients to flow across time — gated by three learned gates:

$$\begin{aligned}
f_t &= \sigma(W_f [h_{t-1}, x_t] + b_f) & \text{(forget gate)} \\
i_t &= \sigma(W_i [h_{t-1}, x_t] + b_i) & \text{(input gate)} \\
\tilde{c}_t &= \tanh(W_c [h_{t-1}, x_t] + b_c) & \text{(candidate cell)} \\
o_t &= \sigma(W_o [h_{t-1}, x_t] + b_o) & \text{(output gate)}
\end{aligned}$$

The cell and hidden state update:

$$c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t$$
$$h_t = o_t \odot \tanh(c_t)$$

where $\odot$ denotes element-wise multiplication and $\sigma$ is the sigmoid function.

---

## Forward Pass (NumPy)

```python
import numpy as np

def sigmoid(x): return 1 / (1 + np.exp(-x))

def lstm_forward(xs, h_prev, c_prev, params):
    W, b = params['W'], params['b']   # W: [4H, H+D], b: [4H]
    H = h_prev.shape[0]
    cache = []

    for x in xs:
        z = np.concatenate([h_prev, x])
        gates = W @ z + b          # [4H]
        f = sigmoid(gates[:H])
        i = sigmoid(gates[H:2*H])
        g = np.tanh(gates[2*H:3*H])
        o = sigmoid(gates[3*H:])
        c = f * c_prev + i * g
        h = o * np.tanh(c)
        cache.append((z, f, i, g, o, c, c_prev))
        h_prev, c_prev = h, c

    return h, c, cache
```

---

## Backward Pass and BPTT

The key insight: gradients flow through $c_t$ via *addition*, not matrix multiplication. The forget gate $f_t$ multiplies the gradient, but since $f_t \in (0,1)$ and it is *learned*, the network can keep $f_t \approx 1$ to let gradients pass unchanged.

```python
def lstm_backward(dh_next, dc_next, cache, params):
    W = params['W']
    H = dh_next.shape[0]
    dW = np.zeros_like(W)
    dz_total = np.zeros_like(cache[0][0])

    for z, f, i, g, o, c, c_prev in reversed(cache):
        tanh_c = np.tanh(c)
        do = dh_next * tanh_c
        dc = dc_next + dh_next * o * (1 - tanh_c**2)
        df = dc * c_prev
        di = dc * g
        dg = dc * i
        dc_prev = dc * f

        # Gate gradients (chain rule through sigmoid/tanh)
        d_gates = np.concatenate([
            df * f * (1 - f),
            di * i * (1 - i),
            dg * (1 - g**2),
            do * o * (1 - o)
        ])

        dW += np.outer(d_gates, z)
        dz = W.T @ d_gates
        dh_next = dz[:H]
        dc_next = dc_prev

    return dW, dh_next, dc_next
```

---

## What I Learned

Building this from scratch revealed several non-obvious insights:
1. **Gradient highways** — the additive cell update is not just a design choice; it's what makes BPTT tractable over long sequences.
2. **Initialization sensitivity** — initializing $b_f \approx 1$ (forget gate bias) dramatically stabilizes early training.
3. **Numerical stability** — the `sigmoid` and `tanh` saturate, so careful weight initialization is essential.

The full implementation, including Seq2Seq with Bahdanau attention, is available on GitHub.
