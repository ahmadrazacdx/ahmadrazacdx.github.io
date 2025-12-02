---
layout: post
title: A Synthesis of Biological and Computational Learning
date: 2024-12-02 15:00:00
description: This blog examines the biological substrates of learning and memory, tracing their influence on the development of artificial neural networks.
tags: neuroscience ai learning memory
categories: blog
toc:
  sidebar: left
---

## Abstract

This blog examines the biological substrates of learning and memory, tracing their influence on the development of artificial neural networks. We first distinguish between three commonly conflated cognitive constructs learning, thinking, and intelligence, establishing precise definitions grounded in neuroscience and cognitive psychology. We then review the principal mechanisms of synaptic plasticity: Hebbian learning, Long-Term Potentiation, Long-Term Depression, and Spike-Timing-Dependent Plasticity. The blog subsequently traces how these biological principles informed computational approaches, from early artificial neurons through modern Large Language Models. We also survey counter-intuitive findings in memory research, including reconsolidation, the protégé effect, curiosity-enhanced encoding, sleep-dependent consolidation, and adult neurogenesis. The blog concludes by examining the Information Bottleneck framework as a unifying principle connecting biological and artificial learning systems.

## 1. Learning, Thinking, and Intelligence

These three words learning, thinking, and intelligence get thrown around interchangeably. Your teacher says you need to "think harder". Your friend claims they "learned" something by watching a TikTok. But in cognitive science, these refer to fundamentally different operations. Understanding the distinction is the first step to understanding your own mind.

### Learning: The Acquisition

Learning is the process of acquiring new information and encoding it into memory. It is an action that changes your brain's physical state.

When you learn something, you are not simply adding data to a mental hard drive. You are rewiring neural circuits. Neurons form new connections called synapses, or strengthen existing ones. This physical reshaping of brain tissue is called **neuroplasticity**, and it is the biological foundation of all learning.

The goal of learning is to move information from fleeting, short-term experience into durable, long-term storage. Memorizing the rules of chess is learning. Practicing how pieces move is learning. The brain is literally changing shape to accommodate this new information.

### Thinking: The Processing

Thinking is what you do with what you've learned. It is the mental manipulation of information, reasoning through a problem, weighing options, imagining outcomes, generating new ideas or insights from existing knowledge.

While learning is about input, thinking is about processing. It relies heavily on the **prefrontal cortex**, the brain region behind your forehead that manages attention, retrieves memories on demand, and simulates possible futures (Miller & Cohen, 2001). When you analyze a chess board, predict your opponent's strategy, and decide your next move, you are thinking. You are using learned information to navigate a present challenge.

### Intelligence: The Capacity

If learning is fuel and thinking is driving, intelligence is the engine. It represents the efficiency and potential with which your brain can learn and think.

Intelligence is often linked to **neural efficiency**, the observation that highly capable brains frequently solve complex problems using less energy, because their neural networks are better integrated and communicate faster (Haier et al., 1988). It's why some people grasp chess strategy in an afternoon while others struggle for months. It's not just effort; it's the underlying hardware doing more with less.

These distinctions matter because they reveal that being "smart" is not one thing. You can be a fast learner but a sloppy thinker. You can have high potential but never fill your tank with knowledge. Understanding this prepares you for what comes next: the biological mechanisms that make these processes possible.

## 2. Biological Mechanisms of Learning

In 1949, a Canadian psychologist Donald Hebb proposed an idea so powerful it still dominates neuroscience today. He wrote: _"When an axon of cell A is near enough to excite cell B and repeatedly or persistently takes part in firing it, some growth process or metabolic change takes place in one or both cells such that A's efficiency, as one of the cells firing B, is increased"_ (Hebb, 1949). The simplified version became a mantra: **"Neurons that fire together, wire together."**
This was revolutionary because it proposed that learning isn't magic, it's plumbing. It's physical connections between cells getting stronger or weaker based on activity. But Hebb couldn't prove it directly. The technology didn't exist. It would take another 24 years for someone to catch the brain in the act.

### The Save Button: Long-Term Potentiation (LTP)

In 1973, Timothy Bliss and Terje Lømo were experimenting on rabbit brains in Norway. They discovered that when they stimulated a neural pathway with rapid, repeated signals, that pathway became hypersensitive and stayed that way for hours, even days. They called this **Long-Term Potentiation** (Bliss & Lømo, 1973).

LTP is your brain's "Save" button. When you experience something important, really pay attention, get emotionally engaged, repeat it enough times, synapses don't just fire; they structurally change. Receptors multiply. Connections thicken. The signal that once whispered now shouts. This is why cramming the night before an exam produces fragile memories that evaporate within days or weeks, while spaced practice over months creates knowledge that lasts years. LTP requires the right conditions: intensity, repetition, and time.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/ltp.webp" width="440" height="auto" alt="LTP">
</p>

### The Delete Button: Long-Term Depression (LTD)

But if the brain only strengthened connections, it would quickly become overloaded every trivial detail preserved forever. The system needs pruning.

In 1982, Masao Ito demonstrated the opposite of LTP in the cerebellum: **Long-Term Depression**, a sustained weakening of synaptic transmission (Ito & Kano, 1982). LTD is how the brain corrects mistakes and clears irrelevant data. It's the biological "Delete" button, ensuring that neural networks don't just accumulate noise but refine themselves toward accuracy. Forgetting isn't failure; it's maintenance.

### The Precision: Spike-Timing-Dependent Plasticity (STDP)

Hebb said neurons that fire together wire together. But neuroscientists in the 1990s discovered something more precise: it matters _when_ they fire relative to each other.

If neuron A fires just before neuron B suggesting A might have caused B to fire, the connection strengthens. But if A fires just after B, the connection weakens. This asymmetry, measured in milliseconds, is called **Spike-Timing-Dependent Plasticity** (Markram et al., 1997; Bi & Poo, 1998).

STDP is how your brain learns causation. It's why you flinch at the sound of a dentist's drill because the sound reliably preceded the discomfort. The brain encodes: this predicts that. It does this automatically, continuously, with extraordinary temporal precision.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/stdp.webp" width="400" height="auto" alt="STDP">
</p>
This mechanism is also remarkably energy-efficient. Rather than computing global error signals across entire networks (as artificial systems do), biological neurons adjust locally based on timing alone. Evolution discovered a learning algorithm that runs on approximately 20 watts, the power of a dim light bulb, while performing learning, memory retrieval, sensory processing, and motor control simultaneously.

## 3. From Biology to Computation

By the mid 20th century, neuroscientists had revealed the brain's learning mechanisms: Hebbian plasticity, LTP, LTD, timing-dependent rules. Engineers looked at this and asked an ambitious question: could we recreate this in computers?

The honest answer is: not exactly. Simulating billions of neurons firing spikes with millisecond precision was computationally impossible in 1943. It's still brutally expensive today. So instead of copying biology faithfully, engineers simplified. They kept the logic and discarded the chemistry.

### The First Artificial Neuron (1943)

Warren McCulloch (a neuroscientist) and Walter Pitts (a mathematician) proposed the first mathematical model of a neuron. Their "McCulloch-Pitts neuron" was a logic gate: it received inputs, summed them, and produced an output of 0 or 1 based on a threshold (McCulloch & Pitts, 1943). No spikes and timing, just arithmetic.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/mc-neuron.webp" width="400" height="auto" alt="WM-Neuron">
</p>

This brutal simplification preserved something essential: the idea that complex behavior could emerge from simple units connected in networks. That insight launched the field of artificial neural networks.

### The Perceptron: A Neuron That Learns (1958)

The McCulloch-Pitts neuron had fixed connections. It couldn't adapt. In 1958, Frank Rosenblatt changed that with the **Perceptron**—an artificial neuron that could adjust its own connection strengths (weights) based on feedback (Rosenblatt, 1958). Show a Perceptron labeled images of triangles and squares; tell it when it's wrong. Over time, it adjusts its weights until it classifies correctly.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/bio-vs-ai-neuron.webp" width="580" height="auto" alt="Perceptron">
</p>
The Perceptron was revolutionary but limited. It could only learn patterns that were "linearly separable", a restriction that seemed fatal when Minsky and Papert publicized it in 1969. AI winter descended.

### Backpropagation: AI's Version of Learning (1986)

The comeback required solving a problem: how do you train a _network_ of neurons, not just one? If a network with hidden layers produces the wrong answer, which connections are responsible? How do you distribute blame?

The solution was **Backpropagation**, short for "backward propagation of errors." Published in its modern form by Rumelhart, Hinton, and Williams in 1986, this algorithm calculates the gradient of error with respect to each weight in the network, then adjusts weights in the direction that reduces error (Rumelhart, Hinton, & Williams, 1986).

Here is the critical divergence between biology and AI:

- **Biology** uses spike timing (STDP)—local, precise, energy-efficient.
- **AI** uses gradient descent (Backpropagation)—global, mathematical, computationally expensive.

We sacrificed biological realism for mathematical tractability. Backpropagation isn't likely how brains learn. But it works and it scales.

### The Transformer: Attention Is All You Need (2017)

For decades, neural networks processed information sequentially, one token at a time in order. This was slow and made it hard to capture long-range relationships in data.

In 2017, a team at Google introduced the **Transformer** architecture, built on a mechanism called "self-attention" that allows the network to look at an entire input simultaneously and weigh the relevance of each part to every other part (Vaswani et al., 2017). Interestingly, this wasn't entirely un-biological. Your visual cortex does something similar when you search for a friend in a crowd, your brain amplifies signals matching their face while dimming everything else (Desimone & Duncan, 1995). This unlocked parallel processing at massive scale. Suddenly, training on billions of web pages became feasible.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/self_attn.svg" width="540" height="auto" alt="Self Attention">
</p>

### Large Language Models: Compressing Human Knowledge (2020)

Combine Transformers with Backpropagation and unprecedented data. Train on billions of documents, books, websites, conversations. The result is models like GPT-3, which demonstrated that a neural network with 175B parameters could perform tasks it was never explicitly trained for: translation, coding, reasoning, even poetry (Brown et al., 2020).

What's happening inside these models? The weights, analogous to synaptic strengths—have encoded compressed statistical patterns from human generated text. They predict and autocomplete with such sophistication that the output often appears indistinguishable from human thought. We didn't build a brain. We built a mathematical approximation massive enough to simulate one.

## 4. Counter-Intuitive Findings in Memory and Learning

The story so far has traced a clean arc from biological neurons to artificial ones. But the brain holds deeper secret mechanisms so counter-intuitive they reshape how we should approach our own learning.

### Every Memory Is a Reconstruction

For most of the 20th century, scientists assumed memory worked like a file cabinet: you store a memory, and later you retrieve it unchanged. This assumption turned out to be fundamentally incorrect.

In 2000, Karim Nader and colleagues demonstrated that every time you recall a memory, it becomes unstable and editable for approximately an hour. During this window, if you block certain proteins, the memory can be erased entirely. You don't retrieve memories; you _reconstruct_ them and each reconstruction can alter the original (Nader, Schafe, & LeDoux, 2000).

This is why eyewitness testimony is unreliable. Every time you tell a story from your past, you tell a slightly modified version of that, thus you're not accessing a recording. You're performing a creative act, subtly rewriting history each time.

### Teaching Others Teaches You

Here's a puzzle: you read a book and feel like you understand it. But when someone asks you to explain it, you stumble. Gaps appear that you didn't know existed. This is the **Protégé Effect**. Fiorella and Mayer (2013) showed that students who studied material expecting to teach it outperformed those who studied to take a test. More remarkably, actually teaching, explaining aloud produced even greater gains.

Why? Teaching forces **linearization**. Your understanding exists as a parallel, interconnected web of concepts. But speech is sequential, one word after another. To teach, you must translate that web into a chain. This process exposes gaps you can't "speak around". Teaching doesn't just transmit knowledge. It debugs and consolidates the teacher's own understanding.

### Curiosity Chemically Enhances Memory

You remember interesting things better than boring ones. This isn't just psychology; it's neurochemistry. Gruber, Gelman, and Ranganath (2014) put people in brain scanners and induced states of high or low curiosity. When curiosity was high, the midbrain's dopaminergic system became active—the same circuitry involved in reward and motivation. This dopamine surge enhanced activity in the hippocampus, the brain's memory-formation center.

Result: people remembered not only what they were curious about but also unrelated information encountered during curious states. Curiosity literally opens a neurochemical window for learning.

### Confusion Is the Sweat of Learning

Common intuition: if practice feels smooth, you're learning well. If it feels hard, you're doing something wrong. Research says the opposite. Kornell and Bjork (2008) demonstrated that **interleaved practice**-mixing different skills or topics randomly feels more difficult and frustrating than blocked practice (focusing on one thing at a time). But interleaved practice produces dramatically better long-term retention.

The discomfort is the signal that learning is occurring. When everything feels easy, you're likely just recognizing familiar patterns without building new understanding.

### The Brain That Works When You Don't

Stop focusing. Let your mind wander. You might think you're being unproductive. You're wrong. In 2001, Marcus Raichle discovered the **Default Mode Network** (DMN), a system of brain regions that becomes _more_ active when you stop concentrating on external tasks (Raichle et al., 2001). The DMN is involved in self-reflection, future planning, and creative recombination of ideas.

This is why insights often arrive in the shower or on walks. The brain has a "night shift" that connects disparate ideas—but it can only work when the "day shift" of focused attention clocks out.

### Sleep Is Ctrl+S

You practiced hard today. You feel like you've improved. But here's the truth: the improvement isn't consolidated until you sleep. During slow-wave sleep, the hippocampus "replays" the day's learning at accelerated speed, transferring information to long-term storage in the neocortex (Stickgold, 2005). If you pull an all-nighter after learning something, the memory trace can physically dissolve. You don't just forget; the learning evaporates as if it never happened.

<p align="center">
  <img src="/assets/blogpost/01-2025-12-02/memory-formation.webp" width="500" height="auto" alt="Memory Formation">
</p>
You cannot cram your way to lasting knowledge. Sleep is not optional; it is part of the learning process itself.

### Your Brain Grows New Neurons (Kills Them If You Don't Learn)

For a century, the dogma held: you're born with all the neurons you'll ever have. Adults don't grow new brain cells. Then came Eriksson et al. (1998), who proved that the human hippocampus generates new neurons throughout life, a process called **adult neurogenesis**. Thousands of neurons are born each day.

But there's a catch. These newborn neurons require a purpose. If they're not recruited into learning new things within approximately two weeks, they die (Tashiro et al., 2007; Shors et al., 2012). Stress accelerates their death; learning and novelty help them survive. Your brain is constantly trying to upgrade its hardware. Whether those upgrades stick depends on whether you give them software to run.

> **Note:** This finding remains contested. Sorrells et al. (2018) found sharply declining neurogenesis after childhood in humans, while Boldrini et al. (2018) found it persists. The debate is unresolved.

## 5. Synthesis: Biology and Computation

We've traveled from synapses to computers and back. The question now is: what have we actually learned?

### Two Solutions to the Same Problem

Biology and engineering faced identical challenge, how do you build a system that improves with experience? Evolution solved it first through approximately 500 million years of trial and error, nervous systems developed Hebbian plasticity, LTP, LTD, and STDP. These mechanisms share a common design philosophy: local computation, temporal precision, and radical energy efficiency. A human brain runs on approximately 20 watts while performing tasks that require megawatts from data centers.

Engineers, confronting the same problem in the 1940s, took a different path. Simulating biological neurons spike-by-spike was computationally intractable, so they abstracted. The McCulloch-Pitts neuron kept only the logic. The Perceptron added adaptability. Backpropagation distributed error globally rather than relying on local timing. Transformers abandoned sequence for parallel attention. Each step traded biological fidelity for mathematical scalability. The result is two fundamentally different architectures that both learn.

### What Each System Lacks

Neither solution is complete. Large language models can generate text indistinguishable from human writing, translate between languages, write functional code, and even produce passable poetry. But they don't "understand" in any phenomenological sense. They predict; they don't comprehend. They have no persistent memory across conversations, no embodied experience, no stakes in being correct.

Biological brains, by contrast, understand deeply. They ground knowledge in sensory experience, maintain continuity of self across decades, and care about outcomes. But they forget constantly, fatigue after hours of concentration, hold biases they cannot inspect, and die.

Each system's strengths illuminate the other's gaps. AI researchers increasingly study neuroscience for architectural inspiration. Neuroscientists use artificial networks as testable models of biological computation. The fields are converging.

### The Compression Principle

One framework connects both: the **Information Bottleneck Theory** (Tishby, Pereira, & Bialek, 1999). It proposes that effective learning, whether biological or artificial, is fundamentally about compression. The goal isn't to memorize everything; it's to discard noise while preserving signal.

Consider your memory of a 2,500-page book. You don't retain every sentence. You extract characters, plot structure, key arguments, emotional peaks. This "lossy compression" isn't a failure of memory, it's the feature. Perfect recall would be metabolically expensive and cognitively useless. What matters is extracting structure that generalizes.

The same principle governs neural networks. During training, deep networks progressively compress their internal representations, discarding input-specific details while preserving features relevant to the task. Tishby's insight was that this compression is not incidental, it's the mechanism by which generalization occurs.

### Why Teaching Works

This framework also explains the Protégé Effect from Section 4. When you read a book, you compress it into a mental model, a parallel web of interconnected concepts. When you teach, you must decompress that model into sequential speech. This forced linearization exposes gaps. You discover what you thought you understood but actually stored at low resolution.

The act of explaining forces re-encoding. You compress again, but this time with awareness of where the previous compression failed. Each cycle of compression and decompression increases fidelity. Teaching isn't just transmission; it's iterative refinement of your own representations.

### The Ongoing Convergence

We stand at an unusual moment in intellectual history. For the first time, humanity has built learning systems sophisticated enough to serve as working hypotheses for how biological cognition might operate, while simultaneously having neuroscientific tools precise enough to test those hypotheses against actual brains.

The next decade will likely see these fields merge further. Neuromorphic chips already implement STDP in hardware. Transformer architectures are being reverse engineered to understand why they work, yielding insights that may apply to cortical computation. The boundary between "understanding the brain" and "building intelligence" is dissolving.

What remains clear is that neither biology nor engineering has finished the job. Intelligence, in its fullest sense, remains an open problem on both fronts.

## Conclusion

Your brain is not a passive receiver of information. It is an active sculptor of neural tissue, strengthening some connections, pruning others, timing its adjustments with millisecond precision. When you learn something, your brain physically changes. When you sleep, it consolidates. When you teach, it debugs. When you're curious, it amplifies.

Artificial intelligence emerged from humanity's attempt to understand and replicate these processes. We didn't succeed in copying the brain, we succeeded in approximating its outcomes through different mathematics. The result is machines that can predict human language with unsettling accuracy, not because they think like us, but because they've been trained on everything we've ever written.

The deeper lesson is this: understanding how learning works biologically and computationally, gives you leverage over your own cognition. Space your practice. Embrace confusion. Sleep. Teach what you want to master. Follow your curiosity, it's not indulgence. It's your dopamine system telling you where your brain is ready to grow.

You are not a fixed entity. You are a process, one that rewires itself with every experience. Now you know the mechanisms. But consider the implications. If learning is compression, and memory is reconstruction, then your sense of understanding your own mind is itself a compressed, reconstructed narrative. When researchers surgically disconnected a patient's left and right brain hemispheres and asked his left hemisphere why he was walking out of the room, it confidently replied, "I'm going to get a Coke"—even though only his right hemisphere knew the real reason (Gazzaniga & LeDoux, 1978). The left hemisphere wasn't lying. It was doing what brains always do: compressing incomplete information into a coherent story.
If half your brain can fabricate explanations without knowing it's confabulating, how much of what you "know" about your own cognition is actually true?

## Further Reading

For readers who want to go deeper, these books offer accessible yet rigorous explorations of the topics covered:

- Kandel, E. R. (2006). _In Search of Memory: The Emergence of a New Science of Mind_.

- Eagleman, D. (2011). _Incognito: The Secret Lives of the Brain_.

- Carey, B. (2014). _How We Learn: The Surprising Truth About When, Where, and Why It Happens_.

- Russell, S. (2019). _Human Compatible: Artificial Intelligence and the Problem of Control_.

- Gazzaniga, M. S. (2018). _The Consciousness Instinct: Unraveling the Mystery of How the Brain Makes the Mind_.

## References

Bi, G., & Poo, M. (1998). Synaptic modifications in cultured hippocampal neurons: Dependence on spike timing, synaptic strength, and postsynaptic cell type. _Journal of Neuroscience_, 18(24), 10464–10472. https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998

Bliss, T. V. P., & Lømo, T. (1973). Long-lasting potentiation of synaptic transmission in the dentate area of the anaesthetized rabbit following stimulation of the perforant path. _The Journal of Physiology_, 232(2), 331–356. https://doi.org/10.1113/jphysiol.1973.sp010273

Boldrini, M., Fulmore, C. A., Tartt, A. N., Simeon, L. R., Pavlova, I., Poposka, V., ... & Mann, J. J. (2018). Human hippocampal neurogenesis persists throughout aging. _Cell Stem Cell_, 22(4), 589–599. https://doi.org/10.1016/j.stem.2018.03.015

Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., ... & Amodei, D. (2020). Language models are few-shot learners. _Advances in Neural Information Processing Systems_, 33, 1877–1901. https://proceedings.neurips.cc/paper/2020/hash/1457c0d6bfcb4967418bfb8ac142f64a-Abstract.html

Desimone, R., & Duncan, J. (1995). Neural mechanisms of selective visual attention. _Annual Review of Neuroscience_, 18, 193–222. https://doi.org/10.1146/annurev.ne.18.030195.001205

Eriksson, P. S., Perfilieva, E., Björk-Eriksson, T., Alborn, A. M., Nordborg, C., Peterson, D. A., & Gage, F. H. (1998). Neurogenesis in the adult human hippocampus. _Nature Medicine_, 4(11), 1313–1317. https://doi.org/10.1038/3305

Fiorella, L., & Mayer, R. E. (2013). The relative benefits of learning by teaching and teaching expectancy. _Contemporary Educational Psychology_, 38(4), 281–288. https://doi.org/10.1016/j.cedpsych.2013.06.001

Gazzaniga, M. S., & LeDoux, J. E. (1978). _The Integrated Mind_. Plenum Press.

Gruber, M. J., Gelman, B. D., & Ranganath, C. (2014). States of curiosity modulate hippocampus-dependent learning via the dopaminergic circuit. _Neuron_, 84(2), 486–496. https://doi.org/10.1016/j.neuron.2014.08.060

Haier, R. J., Siegel, B. V., Nuechterlein, K. H., Hazlett, E., Wu, J. C., Paek, J., ... & Buchsbaum, M. S. (1988). Cortical glucose metabolic rate correlates of abstract reasoning and attention studied with positron emission tomography. _Intelligence_, 12(2), 199–217. https://doi.org/10.1016/0160-2896(88)90016-5

Hebb, D. O. (1949). _The Organization of Behavior: A Neuropsychological Theory_. Wiley & Sons.

Ito, M., & Kano, M. (1982). Long-lasting depression of parallel fiber-Purkinje cell transmission induced by conjunctive stimulation of parallel fibers and climbing fibers in the cerebellar cortex. _Neuroscience Letters_, 33(3), 253–258. https://doi.org/10.1016/0304-3940(82)90380-9

Kornell, N., & Bjork, R. A. (2008). Learning concepts and categories: Is spacing the "enemy of induction"? _Psychological Science_, 19(6), 585–592. https://doi.org/10.1111/j.1467-9280.2008.02127.x

Markram, H., Lübke, J., Frotscher, M., & Sakmann, B. (1997). Regulation of synaptic efficacy by coincidence of postsynaptic APs and EPSPs. _Science_, 275(5297), 213–215. https://doi.org/10.1126/science.275.5297.213

McCulloch, W. S., & Pitts, W. (1943). A logical calculus of the ideas immanent in nervous activity. _Bulletin of Mathematical Biophysics_, 5, 115–133. https://doi.org/10.1007/BF02478259

Miller, E. K., & Cohen, J. D. (2001). An integrative theory of prefrontal cortex function. _Annual Review of Neuroscience_, 24, 167–202. https://doi.org/10.1146/annurev.neuro.24.1.167

Minsky, M., & Papert, S. (1969). _Perceptrons: An Introduction to Computational Geometry_. MIT Press.

Nader, K., Schafe, G. E., & LeDoux, J. E. (2000). Fear memories require protein synthesis in the amygdala for reconsolidation after retrieval. _Nature_, 406(6797), 722–726. https://doi.org/10.1038/35021052

Raichle, M. E., MacLeod, A. M., Snyder, A. Z., Powers, W. J., Gusnard, D. A., & Shulman, G. L. (2001). A default mode of brain function. _Proceedings of the National Academy of Sciences_, 98(2), 676–682. https://doi.org/10.1073/pnas.98.2.676

Rosenblatt, F. (1958). The perceptron: A probabilistic model for information storage and organization in the brain. _Psychological Review_, 65(6), 386–408. https://doi.org/10.1037/h0042519

Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. _Nature_, 323(6088), 533–536. https://doi.org/10.1038/323533a0

Shors, T. J., Anderson, M. L., Curlik, D. M., & Nokia, M. S. (2012). Use it or lose it: How neurogenesis keeps the brain fit for learning. _Behavioural Brain Research_, 227(2), 450–458. https://doi.org/10.1016/j.bbr.2011.04.023

Sorrells, S. F., Paredes, M. F., Cebrian-Silla, A., Sandoval, K., Qi, D., Kelley, K. W., ... & Bhattacharya, N. (2018). Human hippocampal neurogenesis drops sharply in children to undetectable levels in adults. _Nature_, 555(7696), 377–381. https://doi.org/10.1038/nature25975

Stickgold, R. (2005). Sleep-dependent memory consolidation. _Nature_, 437(7063), 1272–1278. https://doi.org/10.1038/nature04286

Tashiro, A., Makino, H., & Gage, F. H. (2007). Experience-specific functional modification of the dentate gyrus through adult neurogenesis: A critical period during an immature stage. _Journal of Neuroscience_, 27(12), 3252–3259. https://doi.org/10.1523/JNEUROSCI.4970-06.2007

Tishby, N., Pereira, F. C., & Bialek, W. (1999). The information bottleneck method. In _Proceedings of the 37th Annual Allerton Conference on Communication, Control, and Computing_ (pp. 368–377).

Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention is all you need. _Advances in Neural Information Processing Systems_, 30, 5998–6008. https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html
